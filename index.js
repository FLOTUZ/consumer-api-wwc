const querystring = require("querystring");
const express = require("express");
const app = express();

app.get("/", function (req, res) {
    const store_url = 'https://bordados.noobhuman.ninja';
    const endpoint = '/wc-auth/v1/authorize';
    const params = {
      app_name: 'Core',
      scope: 'read_write',
      user_id: 1,
      return_url: 'https://api-wwc.herokuapp.com/return-page',
      callback_url: 'https://api-wwc.herokuapp.com/callback-endpoint'
    };
  const query_string = querystring.stringify(params).replace(/%20/g, "+");

  console.log(store_url + endpoint + "?" + query_string);
  res.json({ url: `${store_url}${endpoint}?${query_string}` });
});

app.get("/return-page", function (req, res) {
  let data = decodeURI(req.query);
  res.json({msg:"Se ha logeuado con wordpress", data: data});
});

app.get("/callback-endpoint", function (req, res) {
    let data = decodeURI(req.query);
    console.log(data);
    res.json({msg:"Se ha logeuado con wordpress", data: data});
  });
app.listen(4000);
