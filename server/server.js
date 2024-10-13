const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

// Initialize Express app
const app = express();

// Middleware
app.use(
	cors({
		origin:"https://intern-task-l3dhxgsds-suyash-budhes-projects.vercel.app",
		credentials:true,
	})
) 
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  
  api_key:process.env.API_KEY,       
  api_secret: process.env.API_SECRET  
});

// Cloudinary storage setup for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

// Mongoose schema
const UserSchema = new mongoose.Schema({
  name: String,
  handle: String,
  images: [String],  // Array to store Cloudinary image URLs
});

const User = mongoose.model('User', UserSchema);

// Route to handle form submission and file upload to Cloudinary
app.post('/api/upload', upload.array('images', 10), async (req, res) => {
  try {
    const { name, handle } = req.body;

    // Ensure that images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // Retrieve secure URLs for uploaded images from Cloudinary
    const imagePaths = req.files.map(file => file.path);  // Cloudinary returns 'path' as the secure URL

    // Save user data with Cloudinary image URLs in MongoDB
    const newUser = new User({ name, handle, images: imagePaths });
    await newUser.save();

    console.log('User saved successfully:', newUser);
    res.status(201).send({ message: 'User data saved successfully', user: newUser });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).send({ message: 'Error saving user data', error });
  }
});




// Route to fetch all user data for the admin dashboard
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from MongoDB
    res.status(200).json(users);      // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
});
