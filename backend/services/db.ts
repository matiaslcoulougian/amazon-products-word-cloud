import * as mongoose from "mongoose";

const url = process.env.DB_URL || 'mongodb://localhost:27017/wordcloud';

const connectDb = () => {
    mongoose.connect(url)
        .then(() => console.log('Connected to database.'))
        .catch(err => console.error(err));
}

export default connectDb;