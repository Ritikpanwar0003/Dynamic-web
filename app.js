
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require('path');
const routes = require("./routes/main");
const Detail = require("./models/details");
const Slider = require("./models/slider");
const Service = require("./models/service");
const bodyParser = require("body-parser");
const app = express();

// Static files
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/static', express.static("public"));

// Routes
app.use('', routes);

// Template engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// MongoDB connection and data insertion
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/website_tut", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");

        // Insert data into the Detail model
        await Detail.create({
            brandName: "RITIK TECH",
            brandIconUrl: "https://cdn.pixabay.com/photo/2013/10/25/17/26/tree-200795_1280.jpg",
            links: [
                { label: "Home", url: "/" },
                { label: "Services", url: "/services" },
                { label: "Gallery", url: "/gallery" },
                { label: "Contact Us", url: "/contact us" }
            ]
        });

        console.log("Detail data inserted successfully");
    } catch (error) {
        console.error("MongoDB connection or data insertion error:", error);
        process.exit(1); // Exit the application on error
    } 
})();
 


// Insert data into the Slider model
// Slider.create([
//     {
//         title: 'Learn Java',
//         subTitle: 'Most Popular lang',
//         imageUrl: "/static/images/s1.png"
//     }
//     // Add more slider entries as needed
// ]);

// Service.create([
//     {
//         icon:'fa-solid fa-book',
//         title:'Provide Best Courses',
//         description:'We provide courses that helps student in learning and placement',
//         linkText:'https:/www.learnwithritik.com',
//         link:'Check'
//     },
//     {
//         icon:'fab fa-affilatetheme',
//         title:'Learn Project',
//         description:'We provide project guide that helps student in learning and placement',
//         linkText:'https:/www.learnwithritik.com',
//         link:'Learn'
//     },
//     { 
//         icon:'fab fa-affilatetheme',
//         title:'Learn Project',
//         description:'We provide project guide that helps student in learning and placement',
//         linkText:'https:/www.learnwithritik.com',
//         link:'Learn'
//     }

// ]); 

// Server listening
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
