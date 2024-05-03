const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/index');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

// app.use(mainRoutes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(MONGOURL)
  .then(
    () => console.log('Database is connected'),
    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  photos: Array,
});

const ProductsModel = mongoose.model('products', productsSchema);

app.get('/getProducts', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const perPage = parseInt(req.query.perpage || 9);
  const startIndex = (page - 1) * perPage;
  // const endIndex = startIndex + perPage;
  const data = await ProductsModel.find().skip(startIndex).limit(perPage);
  const itemCount = await ProductsModel.countDocuments();
  const totalPage = itemCount / perPage;
  res.json({ data, totalPage });
});

app.get('/getProducts/:id', async (req, res) => {
  const singleProductData = await ProductsModel.find({ _id: req.params.id });
  res.json(singleProductData);
});

app.post('/getProductsByIds', async (req, res) => {
  const ids = req.body.ids;
  // const amount = req.body.amount;
  // const reqBody = req.body.ids;
  const cartData = [];

  // const cartData = await ProductsModel.find((item) =>
  //   ids.some((i) => i.productId === item._id)
  // );

  for (let i = 0; i < ids.length; i++) {
    const data = await ProductsModel.find({ _id: ids[i].productId });

    cartData.push(...data);
  }

  res.json(cartData);
});
