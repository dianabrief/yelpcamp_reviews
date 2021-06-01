# yelpcamp_reviews
Lesson 46 Adding the reviews Model, please HELP
Yesterday I got this error when submiting reviews:

Cast to ObjectId failed for value "602d7de252f054089863b583 " at path "_id" for model "Campground"



CastError: Cast to ObjectId failed for value "602d7de252f054089863b583 " at path "_id" for model "Campground" at model.Query.exec (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\mongoose\lib\query.js:4358:21) at model.Query.Query.then (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\mongoose\lib\query.js:4452:15) at processTicksAndRejections (internal/process/task_queues.js:93:5)

But today, after adding (???) my project to github I dont\'t get the error anymore but the reviews are not saved. I get this in the bash:

[nodemon] starting `node app.js`
Serving on Port 3000
Database Connected
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:558:11)
    at ServerResponse.header (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\response.js:771:10)
    at ServerResponse.send (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\response.js:170:12)
    at done (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\response.js:1008:10)
    at C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\lib\index.js:285:7
    at tryHandleCache (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\node_modules\ejs\lib\ejs.js:260:5)
    at Object.exports.renderFile (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\node_modules\ejs\lib\ejs.js:485:10)
    at renderFile (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\lib\index.js:227:7)
    at C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\lib\index.js:282:7
    at tryHandleCache (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\node_modules\ejs\lib\ejs.js:260:5)
    at Object.exports.renderFile (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\node_modules\ejs\lib\ejs.js:485:10)
    at View.renderFile [as engine] (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\ejs-mate\lib\index.js:227:7)
    at View.render (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\view.js:135:8)
    at tryRender (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\application.js:640:10)
    at Function.render (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\application.js:592:3)
    at ServerResponse.render (C:\jsbootcamp2\46_yelpcamp_reviews_model\node_modules\express\lib\response.js:1012:7)

You can find my yelpcamp code in the master branch.
Thanks
diana brief
