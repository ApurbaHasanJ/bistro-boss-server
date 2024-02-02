const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersCollection = require("../models/users");

// jwt setup
router.post("/", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// jwt verification middleware
const verifyJWT = (req, res, next) => {
  // skip verification routes
  const excludedRoutes = ["/dashboard/add-review"];

  const authorization = req.headers.authorization;
  const currentRoute = req.path;

  // proceed next if routes doesn't contain security
  if (excludedRoutes.includes(currentRoute)) {
    return next();
  }

  // if not authorized
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Invalid authorization" });
  }

  // bearer token
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: true, message: err.message });
    }
    res.decoded = decoded;
    next();
  });
};

// verify admin middleware
const verifyAdmin = async (req, res, next) => {
  const email = req.body.email;
  query = { email: email };
  const user = await usersCollection.findOne(query);
  if (user?.role !== "admin") {
    res.status(403).send({ error: true, message: "Forbidden access" });
  }
  next();
};

module.exports = {
  authRouter: router,
  verifyJWT,
  verifyAdmin,
};
