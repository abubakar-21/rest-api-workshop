const express = require('express');
const router = express.Router();

let agare = [
    { id: 1, namn: 'Abbe', bilar: ['Volvo', 'Saab', "Lambo"] },
    { id: 2, namn: 'Oliver', bilar: ['BMW', 'Audi'] },
    { id: 3, namn: 'Hussein', bilar: ['Tesla', 'Mercedes'] }
];

// GET för alla agare med deras bilar
router.get('/', (req, res) => {
    res.json(agare);
});

// GET för en specifik agare med deras bilar
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const agare = agare.find(a => a.id === id);

    if (!agare) {
        res.sendStatus(404);
        return;
    }

    res.json(agare);
});

// POST för att lagga till en ny agare
router.post('/', (req, res) => {
    const agare = req.body;
    agare.id = agare.length + 1;
    agare.bilar = [];
    agare.push(agare);
    res.json(agare);
});

// PUT för att uppdatera en befintlig agare
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const agareIndex = agare.findIndex(a => a.id === id);

    if (agareIndex === -1) {
        res.sendStatus(404);
        return;
    }

    const agare = req.body;
    agare.id = id;
    agare.bilar = agare[agareIndex].bilar;
    agare[agareIndex] = agare;

    res.json(agare);
});

// DELETE för att ta bort en agare
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    agare = agare.filter(a => a.id !== id);
    res.sendStatus(204);
});

module.exports = router;
