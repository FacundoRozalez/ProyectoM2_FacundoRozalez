import express from 'express';
import swaggerUi from 'swagger-ui-express'; 
import YAML from 'yamljs';                
import authorsRoutes from './routes/authors.route.js';
import postsRoutes from './routes/posts.route.js';
import commentsRoutes from './routes/comments.route.js';
import { errorHandler } from './middlewares/error.middleware.js'; // Importamos el nuevo middleware

const app = express();

const swaggerDocument = YAML.load('./swagger/openapi.yaml');
app.use('/openapi', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use(errorHandler);

export default app;