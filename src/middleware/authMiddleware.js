const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect(
      "/login?notice=Please log in to access that page."
    );
  }

  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect(
        "/login?notice=Please log in to access that page."
      );
    }

    if (req.session.user.role !== role) {
      return res.redirect(
        "/dashboard?notice=You do not have permission to access that page."
      );
    }

    next();
  };
};

export {
  requireLogin,
  requireRole,
};