const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const { join } = require("path");

const swaggerDoc = require(join(
  __dirname,
  "../docs",
  "foodordering.json"
));

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;