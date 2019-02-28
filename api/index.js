import WC from 'woocommerce-api';

const CONSUMER_KEY = 'ck_56b0079d96857d6d5c1e062c5d961da03e0cc73c';
const CONSUMER_SECRET = 'cs_8015c08cce2f6407c19e7e9a345a22028a9baef9';
const WooCommerce = new WC({
  url: 'http://woo.localhost/',
  verifySsl: false,
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v3',

});

export const get = (url) => WooCommerce.getAsync(url);

export const post = (url, data) => WooCommerce.postAsync(url, data);

export const put = (url, data) => WooCommerce.putAsync(url, data);
