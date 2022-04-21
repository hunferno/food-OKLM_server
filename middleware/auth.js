import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.userInfo = jwt.verify(token, process.env.AUTH_SECRET);
    next();
  } catch (error) {
    res.status(401).json({message: "Vous n'êtes pas authorisez à faire cette action"})
  }
};

export default auth;
