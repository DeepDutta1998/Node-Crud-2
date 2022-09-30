const student = require("../model/student.model");

exports.create = (req, res) => {
  res.render("index", {
    page_title: "Home",
  });
};

/**
 * @Method insert
 * @Description Insert User Data
 */

exports.insert = async (req, res) => {
  try {
    req.body.firstName = req.body.firstName.trim();
    req.body.lastName = req.body.lastName.trim();
    if (!req.body.firstName && !req.body.lastName) {
      console.log("Field should not be empty");
      res.redirect("/");
    } else {
      let isEmailExist = await student.find({ email: req.body.email });
      if (!isEmailExist.length) {
        req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
        console.log(req.body);
        /* check conatct validation*/
        let saveData = await student.create(req.body);
        console.log(saveData);
        if (saveData && saveData._id) {
          console.log("Data Added Successfully");
          res.redirect("/student-view");
        } else {
          console.log("Data Not Added");
          res.redirect("/");
        }
      } else {
        console.log("Email Already exists");
        res.redirect("/");
      }
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @Method studentView
 * @Description view student data
 */

exports.studentView = async (req, res) => {
  try {
    let studentData = await student.find({});
    // console.log(studentData);
    res.render("studentView", {
      page_title: "student || view",
      studentData,
    });
  } catch (err) {
    throw err;
  }
};

/**
 * @Method delete
 * @Description Delete Data
 * @Delete Hard delete
 */

exports.delete = async (req, res) => {
  try {
    await student.findByIdAndRemove(req.params.id, (err, data) => {
      if (!err) {
        console.log("Data Deleted Successfully...");
        res.redirect("/student-view");
      } else {
        console.log("Something went wrong...");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
