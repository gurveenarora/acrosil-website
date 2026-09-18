# Dockerfile for Render Web Service (Apache + PHP)
FROM php:8.2-apache

# Enable Apache Rewrite Module
RUN a2enmod rewrite

# Copy website files to webroot
COPY . /var/www/html/

# Expose HTTP port
EXPOSE 80
