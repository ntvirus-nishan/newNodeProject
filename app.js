const express = require("express");
const app = express();

const indexModule = require("./modal/index");

app.set("view engine", "ejs");

// telling nodejs to accept the incoming data(parsing data)
app.use(express.json()); // cT = application/json handle
app.use(express.urlencoded({ extended: true })); // cT = application/x-www-form-urlencoded

// Index page route module
//Routing home page
app.get("/", async (req, res) => {
  //to pull the data from database table
  const productsData = await indexModule.products.findAll();
  // console.log(productsData);
  //render ejs file with data passed in it
  res.render("home", { allProduct: productsData });
});

//routing signup page
app.get("/userSignup", (req, res) => {
  res.render("userSignup");
});

//routing addproduct page
app.get("/addProduct", (req, res) => {
  res.render("addProduct");
});

//handling user registration
app.post("/userSignup", (req, res) => {
  //console.log(req.body);
  const userName = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  //to input the data inside database
  indexModule.userdetails.create({
    userName: userName,
    email: email,
    password: password,
  });
  res.send("Form Sumbited successfully");
});

//Handling Add Product
app.post("/addProduct", async (req, res) => {
  // console.log(req.body);

  //storing data into variable
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const published = req.body.published;

  //Destructuring
  // const{title,price,description,published} = req.body;

  //To insert our data into our database
  await indexModule.products.create({
    title: title,
    price: price,
    description: description,
    published: published,
  });

  //after submiting redirecting to another page (here we are redirecting to home page)
  res.redirect("/");
});

//
app.listen(3000, () => {
  console.log("Server Stared in prot 3000");
});
