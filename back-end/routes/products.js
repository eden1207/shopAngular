const express = require('express');

/** Création d'un router */
const router = express.Router();

/** Appel des fonctionnalités associées aux calls API */
const productsCtrl = require('../controllers/products');

/** Méthode POST */
router.post('/', productsCtrl.createThing);

/** Méthode PUT */
router.put('/:id', productsCtrl.modifyThing);

/** Méthode DELETE */
router.delete('/:id', productsCtrl.deleteThing);

/** Méthode GET pour récupérer un objet spécifique selon l'id */
router.get('/:id', productsCtrl.getOneThing);

/** Méthode GET */
router.get('/', productsCtrl.getAllThings);

module.exports = router;
