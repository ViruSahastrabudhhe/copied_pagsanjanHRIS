# =====================================================================
# STAGE 1: Build Frontend Assets (React/Vite)
# =====================================================================
FROM node:22.14.0 AS asset-builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# DEBUG - Verify build
RUN ls -la /app/public/build/ && cat /app/public/build/manifest.json | head -20

# =====================================================================
# STAGE 2: Production PHP Application Server
# =====================================================================
FROM php:8.4-apache

# Install dependencies
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

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html

# ✅ STEP 1: Copy built assets FIRST (before anything else)
COPY --from=asset-builder /app/public/build ./public/build

# DEBUG - Verify assets were copied
RUN echo "=== ASSETS COPIED ===" && ls -la /var/www/html/public/build/
RUN echo "=== MANIFEST ===" && cat /var/www/html/public/build/manifest.json | head -20 || echo "MANIFEST MISSING!"

# ✅ STEP 2: Copy the rest of the application (this will NOT overwrite public/build)
COPY . .

# ✅ STEP 3: Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Set permissions
RUN mkdir -p /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
CMD php artisan migrate --force && apache2-foreground