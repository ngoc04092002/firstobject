
const buyerRouter = require('./buyer');
const siteRouter = require('./site');
const userRouter = require('./user');
const productsRouter = require('./products');
// const csurf = require('csurf');
// app.use(csurf()); //ensure cookies

function router(app){
    app.use('/products',productsRouter);
    app.use('/user',userRouter);
    app.use('/buyer',buyerRouter);
    app.use('/', siteRouter);
}

module.exports = router;