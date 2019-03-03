


### Download

git clone this repo

```bash
git clone <repo>
```

# Install it and run:

you will need
- node v9+
- MySQL

## Setup Woocommerce
- You need to install [WooCommerce API](https://woocommerce.github.io/woocommerce-rest-api-docs/#introduction) on your wordpress site. Plugin installation instruction can be found [here](https://docs.woocommerce.com/document/installing-uninstalling-woocommerce/)

## Generete your woocommerce customer secret and customer key
 Follow this [instruction](https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication) to generate the keys
 - Create a `.env ` file in your root directory and paste the key and the url to your site as follows
 ```bash
 #.env
WOOCOMERCE_URL=<your.wordpress.site>
WOO_CUSTOMER_SECRET=cs_XXXX
WOO_CUSTOMER_KEY=ck_XXXX

 ```

# database connection
to you `.env` file add the following variable and set the mysql user and password running on your local instance
```bash
DB_HOST=127.0.0.1
DB_USER=<db_user>
DB_PASS=<db_password>
DB_NAME=<db_name>
```
## Run migrations
In your terminal run
`knex migrate:latest`


# Starting the app

Nb: make sure that your wordpress site  running woocommerce API is up and running.

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

# Create user :
on the login page click on the `click to signup ` link to create an account

- if the registration goes through click on the `click to login `link and login