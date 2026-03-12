const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("Acceso denegado");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "clave_secreta");

    req.user = verified;

    next();
    
  } catch (error) {
    res.status(500).json("Token invalido");
  }
};

module.exports = verifyToken;
