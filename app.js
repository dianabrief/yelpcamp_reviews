const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

// const { campgroundSchema } = require('./schemas.js');
// const catchAsync = require('./utils/catchAsync');
// const ExpressError = require('./utils/ExpressError');

const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
})

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {

  const { error } = campgroundSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
  // console.log(result);
}


// function wrapAsync(fn) {
//   return function (req, res, next) {
//       fn(req, res, next).catch(e => next(e))
//   }
// }


app.get('/', (req, res) => {
  // res.send('YELP CAMP');
  res.render('home');
})

//INDEX ROUTE:
app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}));

//NEW ROUTE
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

//CREATE ROUTE
app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
  // try {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    // const campgroundSchema = Joi.object({
    //   campground: Joi.object({
    //     title: Joi.string().required(),
    //     price: Joi.number().required().min(0),
    //     image: Joi.string().required(),
    //     location: Joi.string().required(),
    //     description: Joi.string().required()
    //   }).required()
    // })
    // // const result = campgroundSchema.validate(req.body);
    // // if(result.error) {

    //   // throw new ExpressError(result.error.details, 400)
    // // }
    // const { error } = campgroundSchema.validate(req.body);
    // if(error) {
    //   const msg = error.details.map(el => el.message).join(',')
    //   throw new ExpressError(msg, 400)
    // }   
    // console.log(result);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  // } catch(e) {
  // next(e);
  // }
}))

//SHOW ROUTE:
app.get('/campgrounds/:id', catchAsync(async(req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground} );
}))

//EDIT ROUTE
//EDIT FORM
app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground } );
}))

//EDIT OR UPDATE ROUTE
// app.put('/campgrounds/:id', validateCampground, wrapAsync(async (req, res) => {
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground});
  res.redirect(`/campgrounds/${campground._id}`)
}));

//DELETE ROUTE
app.delete('/campgrounds/:id', catchAsync(async(req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}))

//CREATE REVIEWS ROUTE
app.post('/campgrounds/:id/reviews', catchAsync(async (req, res) => {
  // res.send('YOU MADE IT REVIEWS ROUTE');
  // res.send(req.body);
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
}))


app.all('*', (req, res, next) => {
  // res.send("404 !!!!")
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  // res.send("Error...something went wrong")
  // const { statusCode = 500, message = 'Something went wrong' } = err;
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  // res.status(statusCode).send(message);
  res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
  console.log('Serving on Port 3000');
})
