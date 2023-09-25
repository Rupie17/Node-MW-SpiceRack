const router = require('express').Router({mergeParams: true});

const spices = [
  {
    id: 1,
    name: 'cardamom',
    grams: 45,
    spiceRackId: 1,
  },
  {
    id: 2,
    name: 'pimentón',
    grams: 20,
    spiceRackId: 1,
  },
  {
    id: 3,
    name: 'cumin',
    grams: 450,
    spiceRackId: 3,
  },
  {
    id: 4,
    name: 'sichuan peppercorns',
    grams: 107,
    spiceRackId: 2,
  }
];

let nextSpiceId = 5;

router.use(bodyParser.json());

// Add your code here:
router.param('spiceId', (req, res, next, id) => {
  const spiceId = Number(id);
  const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
  if (spiceIndex !== -1) {
    req.spiceIndex = spiceIndex;
    next();
  } else {
    res.sendStatus(404);
  }
})


router.post('/', (req, res, next) => {
  const newSpice = req.body.spice;
  newSpice.spiceRackId = Number(req.params.spiceRackId);

  if (newSpice.name && newSpice.grams) {
    newSpice.id = nextSpiceId++;
    spices.push(newSpice);
    res.status(201).send(newSpice);
  } else {
    res.status(400).send();
  }
});

router.get('/spices/', (req, res, next) => {
    res.send(spices);
  });

router.get('/:spiceId', (req, res, next) => {
    res.send(spices[req.spiceIndex]);
});

router.put('/:spiceId', (req, res, next) => {
    spices[req.spiceIndex] = req.body.spice;
    res.send(spices[req.spiceIndex]);
});

router.delete('/:spiceId', (req, res, next) => {
    spices.splice(req.spiceIndex, 1);
    res.sendStatus(204);
});

module.exports = router;