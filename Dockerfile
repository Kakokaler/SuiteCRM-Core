# 使用debian:buster作为基础镜像
FROM debian:buster

# 更新软件源并安装必要的软件包
RUN apt-get update && apt-get install -y \
    apache2 \
    mariadb-server \
    php \
    php-cli \
    php-curl \
    php-common \
    php-intl \
    php-json \
    php-gd \
    php-mbstring \
    php-mysqli \
    php-pdo-mysql \
    php-openssl \
    php-soap \
    php-xml \
    php-zip \
    curl \
    git \
    vim

# 设置工作目录为/var/www/html
WORKDIR /var/www/html

# 复制本地文件到工作目录
COPY . .

# 设置环境变量
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2

# 暴露80端口
EXPOSE 80

# 启动apache2服务
CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
