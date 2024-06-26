import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import jsxViewEngine from "jsx-view-engine";
import methodOverride from "method-override";
import db from "./db/conn.mjs";
import laptopRoutes from "./controllers/laptop.mjs";
import phoneRoutes from "./controllers/phone.mjs";
import machineRoutes from "./controllers/machine.mjs";

//creating express application and other variables
const app = express();
const PORT = process.env.PORT || 5051;

// MIDDLEWARE

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

//SET UP VIEW ENGINE

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());


// Validation middleware for checking if a field is empty
app.post('/api/student', )
const validateEmptyField = (req, res, next) => {
  const { name, brand, color } = req.body;
  if (!name || !brand || !color) {
      return res.status(400).send('Name, brand, and color are required fields.');
  }
  next();
};

//////LAPTOP ROUTES
app.use("/laptops", laptopRoutes);
app.get('/', (req, res) => {
  res.send(
    `<div> Root routes for laptops, phones, and machines <br /><br/>
    <a href='/laptops'>Laptops</a><br/><br/>
    <a href='/phones'>Phones<br/><br/>
    <a href='/machines'>Machines<br/><br/> `
    /*this line is for all the 3 route*/
  );
});


/////PHONES ROUTES
app.use("/phones", phoneRoutes);

app.get('/', (req, res) => {
    res.send(
      `<div> Root routes for laptops, phones, and machines <br /><br/>
      <a href='/laptops'>Laptops</a><br/><br/>
      <a href='/phones'>Phones<br/><br/>
      <a href='/machines'>Machines<br/><br/>`
         /*this line is for all the 3 route*/
    );
});


//////MACHINE ROUTES
app.use("/machines", machineRoutes);
app.get('/', (req, res) => {
  res.send(
    `<div> Root routes for laptops, phones, and machines <br /><br/>
    <a href='/laptops'>Laptops</a><br/><br/>
    <a href='/phones'>Phones<br/><br/>
    <a href='/machines'>Machines <br/><br/>`
    /*this line is for all the 3 route*/
  );
});



app.listen(PORT, () => {
  console.log(`listening`);
});


