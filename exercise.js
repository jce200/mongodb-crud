const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connecting to MongoDB'))
    .catch(err => console.log('Error while connecting...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    isPublished: Boolean,
    date: {
        type: Date,
        default: Date.now
    },
    price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({
            isPublished: true
        })
        .or([{
                price: {
                    $gte: 15
                }
            },
            {
                name: /.*by.*/i
            }
        ])
        .select({
            name: 1,
            author: 1,
            price: 1
        }).sort({
            price: -1 // or -price
        });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();