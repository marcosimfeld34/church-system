import jwt from "jsonwebtoken";

import { ACCESS_DENIED, INVALID_TOKEN } from "../labels/labels.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: ACCESS_DENIED,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default verifyToken;
