FROM node:10

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN apt-get update && apt-get install openvpn bridge-utils supervisor -y
RUN apk add --no-cache openvpn

RUN npm ci

COPY [".", "/usr/src/"]

# Copy supervisor conf
COPY supervisord.conf /etc/supervisord.conf

COPY client.ovpn /vpn/client.ovpn
COPY client.pwd /vpn/client.pwd
COPY start.sh /start.sh
RUN chmod 755 /start.sh

EXPOSE 3000

CMD ["/start.sh"]