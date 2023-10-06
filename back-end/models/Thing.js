const mongoose = require('mongoose');

/**Création d'un schéma de données. required donne le caractère obligatoire de l'élément.
 * Si on ne donne pas l'élément, l'objet ne pourra pas être créé.
 */
const thingSchema = mongoose.Schema({
  id: { type: Number, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  inventoryStatus: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, required: false },
});

/**On export le modèle de donnée */
module.exports = mongoose.model('Thing', thingSchema);