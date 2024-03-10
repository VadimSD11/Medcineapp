const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://vadimsd11:201205v@medcineapp.wej2f2w.mongodb.net/?retryWrites=true&w=majority&appName=Medcineapp")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define Schema
const drugSchema = new mongoose.Schema({
    title: String,
    price: Number,
    manufacturer: String,
    image: String
});

// Define Model
const Drug = mongoose.model('Drug', drugSchema);


app.set('view engine', 'ejs'); // Set the view engine to EJS

app.get("/Shop", async function(req, res) {
    try {
        // Fetch drugs from MongoDB
        const druglist = await Drug.find();
        res.render("Shop.ejs", { druglist: druglist });
    } catch (err) {
        console.error("Error fetching drugs:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/Shoppingcart", function(req, res) {
    try {
        // Retrieve shopping cart data from localStorage
        //const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        res.render("Shoppingcart.ejs");
    } catch (err) {
        console.error("Error retrieving shopping cart data:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("*", function(req, res) {
    res.send("ERROR! That route doesn't exist")
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
