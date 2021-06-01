const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
  await Campground.deleteMany({});
  // const c = new Campground({ title: 'Camp Probando' });
  // await c.save();
  for(let i = 0; i < 50; i++) {
    const random40 = Math.floor(Math.random() * 40);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random40].city}, ${cities[random40].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum animi ad aliquid aliquam obcaecati accusamus non quos sequi. Dicta facilis dolor laborum perspiciatis ab eius cumque eaque voluptatibus nulla, eum veritatis saepe corporis expedita tenetur amet culpa quia distinctio quod aspernatur eveniet accusantium cum, eligendi maxime quos! Perspiciatis, dolores eaque!',
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})



