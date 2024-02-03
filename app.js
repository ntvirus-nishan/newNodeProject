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

//Single Post / product
app.get("/singlePage/:id", async (req, res) => {
  const id = req.params.id;

  //Access single row data from our table
  const singlePost = await indexModule.products.findAll({
    where: {
      id: id, //second id is from table column name
    },
  });
  // console.log(singlePost);
  res.render("singlePage", { post: singlePost });
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

//Deleting the post

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await indexModule.products.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/");
});

//To editing post/ product
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  //To prefill data
  const data = await indexModule.products.findAll({
    where: {
      id: id,
    },
  });
  //pass the data
  res.render("editPost", { editPost: data });
});

//To save the edited data
app.post("/editPost/:id", (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  //storing data
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  //To update the column data where id == id
  indexModule.products.update(
    {
      title: title,
      price: price,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/singlePage/" + id);
});

//
app.listen(3000, () => {
  console.log("Server Stared in prot 3000");
});
