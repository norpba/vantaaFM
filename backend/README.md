# Backend server for vantaaFM
Hosts an express server that handles connections to a mariadb server

## Installation

install and build from npm:
```
npm install
npm run build
```
setup `.env` file and place it to root of the backend project:

```
DB_HOST = localhost
DB_PORT = 3306
DB_USER = USER HERE!
DB_PASSWORD = PASSWORD HERE!
DB_DATABASE = vantaafm_testi
JWT_TOKEN_PRIVATE_KEY = PRIVATE KEY HERE!
```

Start the server
```
npm run start
```
