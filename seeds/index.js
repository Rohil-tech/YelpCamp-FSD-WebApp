const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');


mongoose.connect('mongodb://localhost:27017/yelp-camp');


const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Databse connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // ANY ONE OF YOUR USERS' OBJECT ID
            author: '63de8e4e6b7e8ac97887b9df',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, odit rerum? Tempore eligendi vitae provident reprehenderit optio cumque quibusdam explicabo pariatur culpa repellendus. Placeat quam voluptate dolor libero unde officia.',
            price,
            geometry: {
                'type': 'Point',
                'coordinates': [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtuqtgf5q/image/upload/v1675940240/YelpCamp/pqpxphj70hg45ijwzaa2.jpg',
                    filename: 'YelpCamp/pqpxphj70hg45ijwzaa2',
                },
                {
                    url: 'https://res.cloudinary.com/dtuqtgf5q/image/upload/v1675940241/YelpCamp/bthnycv0t6nghttzoyzn.jpg',
                    filename: 'YelpCamp/bthnycv0t6nghttzoyzn',
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});