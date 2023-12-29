#!/bin/sh

set -e

grep -qxF '185.199.108.133 raw.githubusercontent.com' /etc/hosts || bash -c 'echo "185.199.108.133 raw.githubusercontent.com" >> /etc/hosts'

# Check if .env file exists
if [ -e .env ]; then
    echo ".env file already exists. Doing nothing."
else
    # Copy .env.dist to .env
    cp .env.dist .env
    echo ".env file created by copying .env.dist."
fi

timestamp()
{
 date +"%Y-%m-%d %T"
}
composer install
runConsoleSymfonyCommand () {
    echo "$(timestamp):[run] php bin/console $1"
    output=`php bin/console $1`
    echo "$(timestamp):[run] Output command 'php bin/console $1' ${output}"
    exitcode=$?
    if [ "$exitcode" != "0" ];
    then
        exit 1;
    fi
}

if [[ -z "$DEBUG" ]]
then
    echo "$(timestamp):[run] Debug disabled"
    [ -f /etc/php7/conf.d/xdebug.ini ] && mv /etc/php7/conf.d/xdebug.ini /etc/php7/conf.d/xdebug.off
else
    echo "$(timestamp):[run] Debug enabled"
    [ -f /etc/php7/conf.d/xdebug.off ] && mv /etc/php7/conf.d/xdebug.off /etc/php7/conf.d/xdebug.ini
fi

runConsoleSymfonyCommand "cache:clear"
runConsoleSymfonyCommand "lexik:jwt:generate-keypair --skip-if-exists"
runConsoleSymfonyCommand "d:m:m -n"
yarn install
yarn encore dev
echo "$(timestamp):[run] Running supervisord";
/usr/bin/supervisord -c ./docker/config/supervisord.conf
