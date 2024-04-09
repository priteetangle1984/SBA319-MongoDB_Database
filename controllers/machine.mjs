import express from 'express';
const router = express.Router();
import Machine from '../models/machine.mjs'
import db from '../db/conn.mjs'

//SEED ROUTE
router.get("/seed", async(req, res) => {
  console.log('in seed');
  try {
  await Machine.create([
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
  res.status(200).redirect('/machines');
      } catch (err) {
          res.status(400).send(err);
      }
  });
  
  router.get('/', async(req, res) => {
    try {
        const foundMachines = await Machine.find({});
//         res.status(200).send(foundMachines);
    } catch (err) {
        res.status(400).send(err);
    }
})

//N - NEW - allows 
router.get('/new', (req, res) => {
    res.render('machines/New');
})

// I - Index    GET         READ - display a list of elements
router.get('/', async (req, res) => {
    try {
        const foundMachines = await Machine.find({});
        res.status(200).render('machines/Index', { machines: foundMachines})
        // res.status(200).send(foundMachines);
    } catch (err) {
        res.status(400).send(err);
    }
})

//D - DELETE - allows a user to remove an item from the database
router.delete('/:id', async(req, res) => {
    try {
const deletedMachine = await Machine.findByIdAndDelete(req.params.id);
console.log(deletedMachine);
res.status(200).redirect('/machines');
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
const updatedMachine = await Machine.findByIdAndUpdate(
req.params.id,
req.body, { new: true},
);
res.redirect(`/machines/${req.params.id}`);
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
      const createdMachine = await Machine.create(req.body);
      res.status(200).send(createdMachine);
  } catch (err) {
      res.status(400).send(err);
  }
})

//E -- EDIT - UPDATE 
router.get("/:id/edit" , async (req, res) => {
  try{
      const foundMachine = await Machine.findById(req.params.id);
      res.status(200).render('machines/Edit', {machine: foundMachine});
  } catch (err) {
      res.status(400).send(err);
  }
})

//S - SHOW route displayhs details of an individual Machine
router.get('/:id', async (req, res) => {
  try {
const foundMachine = await Machine.findById(req.params.id);
res.render('machines/Show', {machine: foundMachine});
  } catch(err) {
  res.status(400).send(err);
  }
})

export default router;