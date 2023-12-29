FROM alpine:3.18

RUN apk --no-cache add php81 php81-fpm php81-mysqli php81-json php81-openssl php81-curl \
    php81-zlib php81-xml php81-phar php81-intl php81-dom php81-xmlreader php81-ctype php81-session \
    php81-mbstring php81-gd php81-iconv php81-simplexml php81-sodium php81-pdo php81-pdo_mysql php81-tokenizer \
    php81-fileinfo php81-zip imagemagick php81-pecl-imagick php81-pecl-xdebug php81-xmlwriter \
    nginx supervisor curl bash vim

# Update the package repository and install Node.js and Yarn
RUN apk --no-cache add nodejs npm yarn

#RUN ln -s /usr/bin/php81 /usr/bin/php

# Configure nginx
COPY config/xdebug.ini /etc/php7/conf.d/xdebug.ini
COPY config/nginix/template/nginx.template.conf /etc/nginx/nginx.conf

# Configure PHP-FPM
COPY config/fpm-pool.conf /etc/php7/php-fpm.d/www.conf
COPY config/php.ini /etc/php7/conf.d/custom.ini

# Install composer from the official image
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Setup document root
RUN mkdir -p /var/www/html

# Add application
WORKDIR /var/www/html

# Expose the port nginx is reachable on
EXPOSE 8080

# Let supervisord start nginx & php-fpm
CMD ["sh", "./docker/run.sh"]
