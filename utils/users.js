const crypto = require("crypto");
const config = require("../knexfile");
const knex = require("knex")(config.development);
const querystring = require("querystring");
const fetch = require("node-fetch");

const WOOCOMMERCE_URL = process.env.WOOCOMERCE_URL
const authenticate = ({ username, password }) => {
  console.log(username, password)
  return knex("users")
    .where({ username })
    .then(([user]) => {
      if (!user) return { success: false };
      const { hash } = saltHashPassword({
        password: password,
        salthash: user.salt
      });
      return {
        success: hash === user.password,
        username: user.username,
      };
    });
};


const createUser = ({ username, password }) => {
  const { salt, hash } = saltHashPassword({password});
  return knex("users").insert({
    salt,
    password: hash,
    username
  }).then(row => row)
  .catch(e => {throw e});
};

const saltHashPassword = ({password, salthash}) => {
  const salt = salthash || randomString();
  const hash = crypto.createHmac("sha512", salt).update(password);
  return {
    salt,
    hash: hash.digest("hex")
  };
};

const randomString = () => {
  return crypto.randomBytes(4).toString("hex");
};

const wooAuthorize = id => {

  const store_url = `http://${WOOCOMMERCE_URL}/`;
  const endpoint = "/wc-auth/v1/authorize";
  const params = {
    app_name: "wooCom",
    scope: "read_write",
    user_id: id,
    return_url: `${store_url}/home`,
    callback_url: `https://${WOOCOMMERCE_URL}/`
  };
  const query_string = querystring.stringify(params).replace(/%20/g, "+");
  fetch(store_url + endpoint + "?" + query_string);
  console.log(store_url + endpoint + "?" + query_string);
};

module.exports = {
  authenticate,
  saltHashPassword,
  createUser,
  saltHashPassword,
  randomString,
  wooAuthorize
};
