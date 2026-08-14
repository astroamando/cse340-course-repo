const showHomePage = async (req, res) => {
  res.render("index", { title: "Home" });
};

export { showHomePage };
