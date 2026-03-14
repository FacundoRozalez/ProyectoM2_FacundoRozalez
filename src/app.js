import express from 'express';
import swaggerUi from 'swagger-ui-express'; // 1. Importar UI
import YAML from 'yamljs';                // 2. Importar cargador YAML
import authorsRoutes from './routes/authors.route.js';
import postsRoutes from './routes/posts.route.js';
import commentsRoutes from './routes/comments.route.js';

const app = express();

// 3. Cargar y servir la documentación (antes de las rutas de la API)
const swaggerDocument = YAML.load('./swagger/openapi.yaml');
app.use('/openapi', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

export default app;