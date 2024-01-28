const express = require('express');
const { router } = require('express/lib/application');
const Detail = require("../models/details");
const Slider = require("../models/slider"); 
const Service = require("../models/service");
const Contact = require("../models/Contact");


const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const details = await Detail.findOne({ "_id": "65b15a8e194e687e8b1f2673" });
    const slides = await Slider.find();
    // console.log(slides)

    const services = await Service.find();

    res.render("index", {
      details: details,
      slides: slides,
      service:services
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

routes.get('/gallery', (req, res) => {
  res.send("gallery");
});

routes.post("/process-contact-form" , async(request,response) =>{
  console.log("form is submitted")
  console.log("request.body")

  try{

    const data = Contact.create(request.body)
    console.log(data)
    response.redirect("/")

  } catch(e){
    console.log(e)
    response.redirect("/")
  }
})

module.exports = routes;
