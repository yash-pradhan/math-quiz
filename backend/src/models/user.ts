import mongoose, { Schema, Document } from 'mongoose';
const MONGODB_URI = 'mongodb://localhost:27017/test';

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



export interface UserDocument extends Document {
  username: string;
  password: string;

}


const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
