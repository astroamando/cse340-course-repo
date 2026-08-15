const showHomePage = async (req, res) => {
  res.render("index", { title: "Home" });
};

const showDashboard = async (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
  });
};

export {
  showHomePage,
  showDashboard,
};