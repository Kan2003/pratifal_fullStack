import connectDb from './db/index.js';
import { app } from './app.js';

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection failed!', err));
