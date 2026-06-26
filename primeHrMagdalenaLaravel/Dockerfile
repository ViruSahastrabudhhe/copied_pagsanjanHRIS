# =====================================================================
# STAGE 1: Build Frontend Assets (React/Vite)
# =====================================================================
FROM node:22.14.0 AS asset-builder
WORKDIR /app

# Copy package files and install Node modules
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# FIX: Ensure all CSS files have content
RUN for file in resources/css/*.css; do \
    if [ ! -s "$file" ] || [ "$(wc -l < "$file")" -lt 3 ]; then \
        echo "Fixing $file"; \
        echo "@tailwind base;" > "$file"; \
        echo "@tailwind components;" >> "$file"; \
        echo "@tailwind utilities;" >> "$file"; \
        echo "" >> "$file"; \
        echo "/* Custom styles for ${file##*/} */" >> "$file"; \
    fi; \
done

# DEBUG: Show all CSS files and their content
RUN echo "=== CSS FILES ===" && ls -la resources/css/
RUN echo "=== CSS CONTENT PREVIEW ===" && head -n 5 resources/css/adminChatbot.css

# Compile Vite assets
RUN npm run build

# DEBUG: Check manifest
RUN echo "=== MANIFEST ===" && cat public/build/manifest.json | grep -E "\.css" || echo "No CSS in manifest!"
RUN echo "=== BUILD FILES ===" && ls -la public/build/

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

# Install native PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest stable Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache for Laravel
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

# DEBUG: Verify assets were copied
RUN echo "=== FINAL BUILD DIRECTORY ===" && ls -la /var/www/html/public/build/
RUN echo "=== FINAL MANIFEST ===" && cat /var/www/html/public/build/manifest.json | grep -E "\.css" || echo "NO CSS IN MANIFEST!"

# Install production PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN mkdir -p /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose web port
EXPOSE 80

# Run migrations then start Apache
CMD php artisan migrate --force && php artisan db:seed --force && apache2-foreground