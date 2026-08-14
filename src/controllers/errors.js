const testErrorPage = (req, res, next) => {
  const error = new Error("This is a test error");
  error.status = 500;
  next(error);
};

const showNotFoundPage = (req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
};

const showErrorPage = (error, req, res, next) => {
  const status = error.status || 500;
  const template = status === 404 ? "404" : "500";

  res.status(status).render(`errors/${template}`, {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: error.message,
    stack: error.stack,
  });
};

export {
  testErrorPage,
  showNotFoundPage,
  showErrorPage,
};
