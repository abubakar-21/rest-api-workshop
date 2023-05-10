const express = require('express');
const router = express.Router();

let bilar = [
    { id: 1, marke: 'Volvo', agareId: 1 },
    { id: 2, marke: 'Saab', agareId: 1 },
    { id: 3, marke: 'BMW', agareId: 2 },
    { id: 4, marke: 'Audi', agareId: 2 },
    { id: 5, marke: 'Tesla', agareId: 3 }
];

// GET för alla bilar
router.get('/', (req, res) => {
    res.json(bilar);
});

// GET för alla bilar för en specifik agare
router.get('/agare/:id', (req, res) => {
    const agareId = Number(req.params.id);
    const agare = agare.find(a => a.id === agareId);

    if (!agare) {
        res.sendStatus(404);
        return;
    }

    const agareBilar = bilar.filter(b => b.agareId === agareId);
    res.json(agareBilar);
});

// GET för en specifik bil
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const bil = bilar.find(b => b.id === id);

    if (!bil) {
        res.sendStatus(404);
        return;
    }

    res.json(bil);
});

// POST för att lagga till en ny bil
router.post('/', (req, res) => {
    const bil = req.body;
    bil.id = bilar.length + 1;
    bilar.push(bil);
    res.json(bil);
});

// PUT för att uppdatera en bil som finns i arrayen
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const bilIndex = bilar.findIndex(b => b.id === id);

    if (bilIndex === -1) {
        res.sendStatus(404);
        return;
    }

    const bil = req.body;
    bil.id = id;
    bilar[bilIndex] = bil;

    res.json(bil);
});

// DELETE för att ta bort en bil
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    bilar = bilar.filter(b => b.id !== id);
    res.sendStatus(204);
});

module.exports = router;