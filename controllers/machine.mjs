import express from 'express';
const router = express.Router();
import Machine from '../models/machine.mjs';
import db from '../db/conn.mjs';


// seed route
router.get("/seed", async (req, res) => {
    console.log('in seed');
    try {
        await Machine.create([
            {
                name: 'grapemachine',
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
        res.status(200).redirect('/machines');
    } catch (err) {
        res.status(400).send(err);
    }
});

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

// N - New - allows a user to input a new machine
router.get('/new', (req, res) => {
    res.render('machines/New');
})

///////////delete-permanantly 
router.delete('/:id', async(req, res) => {
    try{
        const deletedMachine = await Machine.findByIdAndDelete(req.params.id);
        console.log(deletedMachine);
        res.status(200).redirect('/machines');
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
        const updatedMachine = await Machine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
            console.log(updatedMachine);
        res.redirect(`/machines/${req.params.id}`);
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
        const createdMachine = await Machine.create(req.body);
        res.status(200).redirect('/machines');
    } catch (err) {
        res.status(400).send(err);
    }
})

// E - EDIT - update an existing entry in the database
router.get("/:id/edit", async (req, res) => {
    try {
        const foundMachine = await Machine.findById(req.params.id);
        res.status(200).render('machines/Edit', {machine: foundMachine});
    } catch (err) {
        res.status(400).send(err);
    }
})


// S - SHOW - show route displays details of an individual machine
router.get('/:id', async (req, res) => {
    try {
        const foundMachine = await Machine.findById(req.params.id);
        res.render('machines/Show', {machine: foundMachine});
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;