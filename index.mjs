import exxpress from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import jsxviewEngine from "jsx-view-engine";
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
app.use(methodOverride('method'));

//SET UP VIEW ENGINE

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxviewEngine());


//ROUTES
app.use("/laptops", laptopRoutes);
app.get('/', (req, res) => {
  res.send(
    `<div> Root routes for laptops, phones, and machines <br /> <a href='/laptops'>Laptops</a><br/><a href='phones'>Phones<br/><a href='phones'>Machines</div> `
  );
});

app.use("/phones", phoneRoutesRoutes);

app.get('/', (req, res) => {
    res.send(
        `<div> Root routes for laptops, phones, and machines <br /> <a href='/laptops'>Laptops</a><br/><a href='phones'>Phones<br/><a href='phones'>Machines</div> `
         /*this line is for all the 3 route*/
    );
});

app.use("/machines", machineRoutes);

app.get('/', (req, res) => {
    res.send(
        `<div> Root routes for laptops, phones, and machines <br /> <a href='/laptops'>Laptops</a><br/><a href='phones'>Phones<br/><a href='phones'>Machines</div> `
         /*this line is for all the 3 route*/
    );
});

app.listen(PORT, () => {
  console.log(`listening`);
});


