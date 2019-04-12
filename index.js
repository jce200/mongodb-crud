// Schema > compile to model > Class > Object

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connecting to MongoDB'))
    .catch(err => console.log('Error while connecting...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); // uppercase because Class

// async function createCourse() {

//     const course = new Course({
//         name: 'Angular course',
//         author: 'Jonathan',
//         tags: ['angular', 'frontend'],
//         isPublished: true
//     });

//     const result = await course.save();
//     console.log(result);
// }

async function getCourses() {
    const courses = await Course

        // //Starts with...
        // .find({
        //     author: /^jon/
        // })

        // // End with than
        // .find({
        //     author: /than$/i
        // })

        // Contains Jonathan // add /i case insensitive
        .find({
            author: /.*Jonathan.*/
        })

        // .find({
        //     author: 'Jonathan',
        //     isPublished: true
        // })
        // .find()
        // .or([{
        //     author: 'Jonthan'
        // }, {
        //     isPublished: true
        // }])
        // .find({
        //     price: {
        //         $gte: 10,
        //         $lte: 20
        //     }
        // })
        // .find({
        //     price: {
        //         $in: [10, 15, 20]
        //     }
        // })
        .limit(10).sort({
            name: 1
        })
        // .select({
        //     name: 1,
        //     tags: 1
        // })
        .count();
    console.log(courses);
}

getCourses();