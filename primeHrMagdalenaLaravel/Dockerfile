# =====================================================================
# STAGE 1: Build Frontend Assets (React/Vite)
# =====================================================================
FROM node:22.14.0 AS asset-builder
WORKDIR /app

# Copy package files and install Node modules
COPY package*.json ./
RUN npm ci

# Copy application files and compile Vite assets
COPY . .
RUN npm run build

# =====================================================================
# STAGE 2: Production PHP Application Server
# =====================================================================
FROM php:8.4-apache

# Install required system libraries for Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install native PHP extensions required by Laravel 13
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest stable Composer from the official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache for Laravel (Point DocumentRoot to /public)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application source code
COPY . .

# Copy compiled React assets over from Stage 1
COPY --from=asset-builder /app/public/build ./public/build

# Install production PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Set permissions for Laravel caching and storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN mkdir -p /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose web port for Render
EXPOSE 80

# Run migrations then start Apache
CMD php artisan migrate --force && php artisan db:seed --force && apache2-foreground