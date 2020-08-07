const mongoose = require('mongoose');


// ? create a function variable.

const connectDB = async () => {
    
    // ? defining host, connection promise and some defaults to avoid warnings
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)

        // ? if error log in the console and exit process with option (1) to stop it on exit
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

//?export to be able to use in app
module.exports= connectDB