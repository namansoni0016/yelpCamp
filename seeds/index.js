const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databse Connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
console.log(sample);

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 500; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65b0a0637bb5c4ffbbbb066d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam hic sunt dolor in perferendis. Doloremque consectetur facilis, vero sapiente nisi amet aperiam quo soluta illum accusamus ad doloribus laudantium quaerat.',
            price,
            geometry: {
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/deaddl64n/image/upload/v1706270740/YelpCamp/ffenvjam1rucewrqu2zz.jpg',
                    filename: 'YelpCamp/ffenvjam1rucewrqu2zz',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})