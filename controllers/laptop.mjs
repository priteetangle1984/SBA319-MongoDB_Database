import express from 'express';
const router = express.Router();
import Laptop from '../models/laptop.mjs';
import db from '../db/conn.mjs';


// seed route
router.get("/seed", async (req, res) => {
    console.log('in seed');
    try {
        await Laptop.create([
            {
                name: 'grapelaptop',
                color: "pink",
                readyToUse: true
            }, 
            {
                name: 'grape',
                color: 'purple',
                readyToUse: false
            }, 
            {
                name: 'cantelope',
                color: 'orange',
                readyToUse: true
            }
        ])
        res.status(200).redirect('/laptops');
    } catch (err) {
        res.status(400).send(err);
    }
});

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

// N - New - allows a user to input a new laptop
router.get('/new', (req, res) => {
    res.render('laptops/New');
})

///////////delete-permanantly 
router.delete('/:id', async(req, res) => {
    try{
        const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
        console.log(deletedLaptop);
        res.status(200).redirect('/laptops');
        } catch (err) {
            res.status(400).send(err);
        }
})

// U - UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.readyToUse === 'on') {
        req.body.readyToUse = true;
    } else {
        req.body.readyToUse = false;
    }

    try {
        const updatedLaptop = await Laptop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
            console.log(updatedLaptop);
        res.redirect(`/laptops/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err);
    }
})

// C - CREATE
// I am starting with my post route so that I can see the things in my database
router.post('/', async(req, res) => {
    // // this will be useful when have a user input form
    if (req.body.readyToUse === 'on') { // if checked, req.body.readyToUse is set to 'on' - or the checkbox is checked
        req.body.readyToUse = true;
    } else {                            // if not checked, then it was undefined
        req.body.readyToUse = false;
    }
    console.log(req.body)

    try {
        const createdLaptop = await Laptop.create(req.body);
        res.status(200).redirect('/laptops');
    } catch (err) {
        res.status(400).send(err);
    }
})

// E - EDIT - update an existing entry in the database
router.get("/:id/edit", async (req, res) => {
    try {
        const foundLaptop = await Laptop.findById(req.params.id);
        res.status(200).render('laptops/Edit', {laptop: foundLaptop});
    } catch (err) {
        res.status(400).send(err);
    }
})


// S - SHOW - show route displays details of an individual laptop
router.get('/:id', async (req, res) => {
    try {
        const foundLaptop = await Laptop.findById(req.params.id);
        res.render('laptops/Show', {laptop: foundLaptop});
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;