import express from 'express';
import authorsRoutes from './routes/authors.route.js';
import postsRoutes from './routes/posts.route.js';
import commentsRoutes from './routes/comments.route.js';

const app = express();

app.use(express.json());

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

export default app;