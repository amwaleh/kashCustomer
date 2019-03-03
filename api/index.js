import WC from 'woocommerce-api';
const WOOCOMERCE_URL = process.env.WOOCOMERCE_URL
const CONSUMER_KEY = process.env.WOO_CUSTOMER_KEY;
const CONSUMER_SECRET = process.env.WOO_CUSTOMER_SECRET ;
debugger
const WooCommerce = new WC({
  url: `http://${WOOCOMERCE_URL}/`,
  verifySsl: false,
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v3',

});

export const get = (url) => WooCommerce.getAsync(url);

export const post = (url, data) => WooCommerce.postAsync(url, data);

export const put = (url, data) => WooCommerce.putAsync(url, data);
