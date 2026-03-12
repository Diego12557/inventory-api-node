const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json("No tienes Permisos");
    }
    next();
  };
};

module.exports = verifyRole;
