const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const app = express();
//Puerto del sistema
const port = process.env.PORT || 4000;

//Configuracion de la API de WooCommerce
const wc = new WooCommerceRestApi({
  url: "https://core.noobhuman.ninja/",
  consumerKey: "ck_e0a402b26b0cdcdfcfc6436512b2eaba73a0d1ef",
  consumerSecret: "cs_de15415916045ddfd809c5f71d2b1dd11e8243e0",
  version: "wc/v3",
});

//Para aceptar origenes cruzados
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//                      [ WooCommerce ]

//--------------Consultar solo un producto------------------
app.get("/products-wc/:id", async (req, res) => {
  const { id } = req.params;
  const url = `products/${id}`;
  await wc
    .get(url)
    .then((response) => {
      res.json({ producto: response.data });
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

//---------Consultar todos los productos----------
app.get("/products-wc", async (req, res) => {
  await wc
    .get("products")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

/* -----------Actualizar producto ----------
  aca se le manda el parametro a actualizar
  por ejemplo:
      Si se desea actualizar la descripcion
      se manda la query con la key "description"
      con su respectivo valor... algo como:
          const data = {
            description: "Nueva descripcion"
          }

*/
app.put("/products-wc/:id", async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.query;

  console.log(datosActualizados);

  const url = `products/${id}`;

  await wc
    .put(url, datosActualizados)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

app.get("/nueva-orden", async (req, res) => {
  await wc
    .get("orders")
    .then((response) => {
      res.json({ordenes: response.data});
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

app.listen(port, () => {
  console.log("El servidor esta escuchando en: http://localhost:" + port);
});
