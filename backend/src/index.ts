import express from 'express';
import cors from 'cors';
import userRoutes from './routes/routes.ts'; // Import the user routes

const app = express();

// Use the cors middleware with default options (allow all origins)
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb://localhost:27017/test';

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes
app.use('/', userRoutes);

// Start the server
// mongoose.connect(MONGODB_URI).then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// }).catch((error) => {
//   console.error('MongoDB connection error:', error);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});