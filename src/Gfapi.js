require("es6-promise").polyfill();
require("isomorphic-fetch");
var CryptoJS = require("crypto-js");

export function CalculateSig(stringToSign, privateKey) {
  let hash = CryptoJS.HmacSHA1(stringToSign, privateKey);
  let base64 = hash.toString(CryptoJS.enc.Base64);
  return encodeURIComponent(base64);
}
export function submitForm(values) {
  let values_json = {
    input_values: {
      ...values
    }
  };

  let d = new Date();
  let expiration = 3600; // 1 hour,
  let unixtime = parseInt(d.getTime() / 1000, 10);
  let future_unixtime = unixtime + expiration;
  let publicKey = "175345e08c";
  let privateKey = "b7b7829a5f82b3f";
  let method = "POST";
  let route = "forms/1/submissions";
  let stringToSign =
    publicKey + ":" + method + ":" + route + ":" + future_unixtime;
  let sig = CalculateSig(stringToSign, privateKey);

  var url =
    "https://crosspointnv18.elitewebscapes.com/gravityformsapi/" +
    route +
    "?api_key=" +
    publicKey +
    "&signature=" +
    sig +
    "&expires=" +
    future_unixtime;

  return fetch(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values_json)
  });
}
