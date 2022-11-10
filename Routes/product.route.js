const { validateAccessToken } = require('../middleware/auth');

module.exports = app =>{

    //import the product controller
    const products = require('../controllers/product.controller');

    //import the express Router
    const router = require('express').Router();

    //handle POST /products and use validateAccessToken middleware to validate token 
    //before proceeding to the saveProduct api for Admin only
    router.post('/products', validateAccessToken, products.saveProduct);

    //GET /products?name=&.....
    router.get('/products', products.searchProducts);

    //GET /products/categories
    router.get('/products/categories', products.searchProductsCategories);

    //GET /products/:id
    router.get('/products/:id', products.searchProductByID);
 
    //PUT /products/:id for Admin only
    router.put('/products/:id', validateAccessToken, products.updateProduct);

    //DELETE /products/:id only Admin only
    router.delete('/products/:id',validateAccessToken, products.deleteProduct)

    //use the router
    app.use('/api', router);
}