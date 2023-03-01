const { response } = require('express');
var express = require('express');
const { deleteProduct } = require('../helpers/product-helpers');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')

/* GET admin listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {

    res.render('admin/view-products', { products, admin: true });
  })
});

router.get("/add-product", function (req, res) {
  res.render('admin/add-product')
});

router.post('/add-product', (req, res, next) => {
  productHelpers.addProduct(req.body, (insertedId) => {
    let image = req.files.Image
    image.mv('./public/product-image/' + insertedId + '.jpg', (err) => {
      if (!err) {
        res.render('admin/add-product')
      } else {
        console.log(err);
      }
    })
  })
});


router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin')
    console.log(response);
  })
});


router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelpers.getProductDetials(req.params.id)
  // console.log(product);
  res.render('admin/edit-product', { product })
});


router.post('/edit-product/:id', (req, res) => {
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    let insertedId = req.params.id
    res.redirect('/admin')
    if (req.files.Image) {
      let image = req.files.Image
      image.mv('./public/product-image/' + insertedId + '.jpg')
    }
  })
})


module.exports = router;  
