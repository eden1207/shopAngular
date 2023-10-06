const Thing = require('../models/Thing');

/** Méthode POST */
exports.createThing = (req, res, next) => {
    // MongoDB va automatiquement ajouter un id sur l'objet. On le supprime.
    delete req.body._id; 
    const thing = new Thing({
        // opérateur "spread" "..." pour copier tous les éléments de req.body
      ...req.body
    });
    // On sauve l'objet formaté
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

/** Méthode PUT */
/** updateOne prend 2 obj en argument. Le premier donne l'id indiqué et le deuxième vérifie
 * si l'obj sélectionné a l'id indiqué
 */
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

/** Méthode DELETE */
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

/** Méthode GET pour récupérer un objet spécifique selon l'id */
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};

/** Méthode GET */
exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};
