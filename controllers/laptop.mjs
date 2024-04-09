import express from 'express';
const router = express.Router();
import Laptop from '../models/laptop.mjs'
import db from '../db/conn.mjs'

//SEED ROUTE
router.get("/seed", async(req, res) => {
  console.log('in seed');
  try {
  await Laptop.create([
      {
          name: 'Dell',
          color: 'gray',
          readyToUse: false
      },
      {
          name: 'HP',
          color: 'black',
          readyToUse: true
      },
      {
          name: 'MacBook Air',
          color: 'white',
          readyToUse: false
      },
      {
        name: 'Acer Chromebook',
        color: 'Silver',
        readyToUse: false
      },
      {
        name: 'MacBook Pro',
          color: 'rose gold',
          readyToUse: false
      }
  ])
  res.status(200).redirect('/laptops');
      } catch (err) {
          res.status(400).send(err);
      }
  });
  
  router.get('/', async(req, res) => {
    try {
        const foundLaptops = await Laptop.find({});
//         res.status(200).send(foundLaptops);
    } catch (err) {
        res.status(400).send(err);
    }
})

//N - NEW - allows 
router.get('/new', (req, res) => {
    res.render('laptops/New');
})

// I - Index    GET         READ - display a list of elements
router.get('/', async (req, res) => {
    try {
        const foundLaptops = await Laptop.find({});
        res.status(200).render('laptops/Index', { laptops: foundLaptops})
        // res.status(200).send(foundLaptops);
    } catch (err) {
        res.status(400).send(err);
    }
})

//D - DELETE - allows a user to remove an item from the database
router.delete('/:id', async(req, res) => {
    try {
const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
console.log(deletedLaptop);
res.status(200).redirect('/laptops');
    } catch (err) {
res.status(400).send(err);
    }
})


//U-UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
} else {
    req.body.readyToEat = false;
}
try {
const updatedLaptop = await Laptop.findByIdAndUpdate(
req.params.id,
req.body, { new: true},
);
res.redirect(`/laptops/${req.params.id}`);
} catch (err) {
    res.status(400).send(err);
}
})

//C-CREATE 
// I am starting with my post route so taht I can see the things in my database
router.post('/', async(req, res) => {
  // this will be useful when have a user input form
  if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on' - or the checkbox is checked
      req.body.readyToEat = true;
  } else {                            // if not checked, then it was undefined
      req.body.readyToEat = false;
  }
  console.log(req.body)

  try {
      const createdLaptop = await Laptop.create(req.body);
      res.status(200).send(createdLaptop);
  } catch (err) {
      res.status(400).send(err);
  }
})

//E -- EDIT - UPDATE 
router.get("/:id/edit" , async (req, res) => {
  try{
      const foundLaptop = await Laptop.findById(req.params.id);
      res.status(200).render('laptops/Edit', {laptop: foundLaptop});
  } catch (err) {
      res.status(400).send(err);
  }
})

//S - SHOW route displayhs details of an individual Laptop
router.get('/:id', async (req, res) => {
  try {
const foundLaptop = await Laptop.findById(req.params.id);
res.render('laptops/Show', {laptop: foundLaptop});
  } catch(err) {
  res.status(400).send(err);
  }
})

export default router;