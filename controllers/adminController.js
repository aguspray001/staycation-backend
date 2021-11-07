const Category = require("../models/Category");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard", {
      title: "Staycation | Dashboard",
    });
  },
  viewCategory: async (req, res) => {
    try {
      const data = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/category/view_category", {
        data,
        alert,
        title: "Staycation | Category",
      }); //data dilempar ke view ejs
    } catch (e) {
      res.render("admin/category/view_category", { data }); //data dilempar ke view ejs
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (e) {
      req.flash("alertMessage", `${e.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (e) {
      req.flash("alertMessage", `${e.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (e) {
      req.flash("alertMessage", `${e.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  viewBank: (req, res) => {
    res.render("admin/bank/view_bank", {
      title: "Staycation | Bank",
    });
  },
  viewItem: (req, res) => {
    res.render("admin/item/view_item", {
      title: "Staycation | Item",
    });
  },
  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking", {
      title: "Staycation | Booking",
    });
  },
};