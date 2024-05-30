// server.js

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const dbConfig = require('./config/db.config');
const db = require('./models');
const Role = db.role;

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'ecommerce-session',
    keys: ['COOKIE_SECRET'], // should use as secret environment variable
    httpOnly: true
  })
);

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

// Import and use authentication routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Import and use article routes
const articleRoutes = require('./routes/article.routes');
app.use('/api', articleRoutes);

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: 'user' }).save(),
        new Role({ name: 'moderator' }).save(),
        new Role({ name: 'admin' }).save()
      ]);
      console.log('Roles added successfully.');
    }
  } catch (err) {
    console.error('Error initializing roles:', err);
  }
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
