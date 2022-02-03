const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Products = new Schema({
    // author: ObjectId,
    _id: { type: Number, },
    type: { type: String},
    image: { type: String },
    name: { type: String, required: true, default: 'Hết hàng!' },
    description: { type: String, maxLength: 255 },
    price: { type: String, required: true, default:'0đ'},
    sale: { type: String},
    slug: { type: String, slug: 'name', unique: true },

},
    {
        _id: false,
        timestamps: true,
    },
);

mongoose.plugin(slug);
Products.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true
});


module.exports = mongoose.model('products', Products);