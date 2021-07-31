const mongoose = require('mongoose');
const dbconnetion = async () => {

    try {
        
        await mongoose.connect("mongodb+srv://admin:admin@kondors.tletb.mongodb.net/kondors?retryWrites=true&w=majority",
        { useNewUrlParser: true, 
          useUnifiedTopology: true,
          useCreateIndex: true
        });   
        console.log('Database: \x1b[32m%s\x1b[0m', 'online');
    } catch (error) {
        console.log('aqui esta el error ', error);
        throw new Error(' Error al iniciar1 BD');
    }
}
module.exports = {
    dbconnetion
}

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@kondors.tletb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });