const { router } = require("../connection");
const {
  handleGetUserCarts,
  handlePostUserCarts,
} = require("../controllers/carts");

router.route("/").get(handleGetUserCarts).post(handlePostUserCarts);

module.exports = router;
