import express from 'express';
const router = express.Router();
import Phone from '../models/phone.mjs';
import db from '../db/conn.mjs';


// seed route
router.get("/seed", async (req, res) => {
    console.log('in seed');
    try {
        await Phone.create([
            {
                name: 'Iphone',
                color: "White",
                brand: "",
                readyToUse: true
            }, 
            {
                name: 'Samsung Galaxy',
                color: 'purple',
                brand: "Samsung",
                readyToUse: false
            }, 
            {
                name: 'BlackBerry Evolve X',
                color: 'Black',
                brand: "BlackBerry",
                readyToUse: true
            }
        ])
        res.status(200).redirect('/phones');
    } catch (err) {
        res.status(400).send(err);
    }
});

// I - Index    GET         READ - display a list of elements
router.get('/', async (req, res) => {
    try {
        const foundPhones = await Phone.find({});
        res.status(200).render('phones/Index', { phones: foundPhones})
        // res.status(200).send(foundPhones);
    } catch (err) {
        res.status(400).send(err);
    }
})

// N - New - allows a user to input a new phone
router.get('/new', (req, res) => {
    res.render('phones/New');
})

///////////delete-permanantly 
router.delete('/:id', async(req, res) => {
    try{
        const deletedPhone = await Phone.findByIdAndDelete(req.params.id);
        console.log(deletedPhone);
        res.status(200).redirect('/phones');
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
        const updatedPhone = await Phone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
            console.log(updatedPhone);
        res.redirect(`/phones/${req.params.id}`);
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
        const createdPhone = await Phone.create(req.body);
        res.status(200).redirect('/phones');
    } catch (err) {
        res.status(400).send(err);
    }
})

// E - EDIT - update an existing entry in the database
router.get("/:id/edit", async (req, res) => {
    try {
        const foundPhone = await Phone.findById(req.params.id);
        res.status(200).render('phones/Edit', {phone: foundPhone});
    } catch (err) {
        res.status(400).send(err);
    }
})


// S - SHOW - show route displays details of an individual phone
router.get('/:id', async (req, res) => {
    try {
        const foundPhone = await Phone.findById(req.params.id);
        res.render('phones/Show', {phone: foundPhone});
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;