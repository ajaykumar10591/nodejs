const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://ajaykumar2:Duqpt804Svh5IKXt@cluster0.5dxyfl5.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    await db.collection('products').insertOne(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.json({message: 'Could not store data.'});
  } finally {
    await client.close();
  }
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    res.json({message: 'Could not retrieve products.'});
  } finally {
    await client.close();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
