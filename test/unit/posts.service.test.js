import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { 
  createPostService, 
  getAllPostsService, 
  updatePostService, // <--- AGREGADO ESTE IMPORT
  deletePostService 
} from '../../src/services/posts.service.js';
import { 
  createAuthorService, 
  deleteAuthorService 
} from '../../src/services/authors.service.js';

describe('Posts Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;
  let tempPostId;

  beforeAll(async () => {
    const author = await createAuthorService({
      name: "Service Tester",
      email: `service_${Date.now()}@test.com`,
      bio: "Test Bio"
    });
    tempAuthorId = author.id;
  });

  test('createPostService debe insertar un post y devolverlo', async () => {
    const nuevoPost = {
      title: "Post de Prueba",
      content: "Contenido del post",
      author_id: tempAuthorId,
      published: true
    };
    const post = await createPostService(nuevoPost);
    tempPostId = post.id;

    expect(post).toHaveProperty('id');
    expect(post.title).toBe(nuevoPost.title);
  });

  test('createPostService debe fallar si el autor no existe (FK Error)', async () => {
    const postInvalido = { title: "X", content: "X", author_id: 999999 };
    await expect(createPostService(postInvalido)).rejects.toThrow(); 
  });

  test('getAllPostsService debe incluir el author_name (JOIN)', async () => {
    const posts = await getAllPostsService();
    expect(Array.isArray(posts)).toBe(true);
    const miPost = posts.find(p => p.id === tempPostId);
    expect(miPost).toBeDefined();
    expect(miPost).toHaveProperty('author_name');
  });

  test('updatePostService debe actualizar un post existente', async () => {
    // Creamos uno nuevo para no afectar el tempPostId principal
    const postParaUpdate = await createPostService({
      title: "Original",
      content: "Original",
      author_id: tempAuthorId
    });

    const datosNuevos = {
      title: "Título Nuevo",
      content: "Contenido Nuevo",
      author_id: tempAuthorId,
      published: false
    };

    const res = await updatePostService(postParaUpdate.id, datosNuevos);
    expect(res.title).toBe("Título Nuevo");
    expect(res.published).toBe(false);

    await deletePostService(postParaUpdate.id);
  });

  test('updatePostService debe retornar null si el post no existe', async () => {
    const res = await updatePostService(999999, { 
      title: "X", 
      content: "X", 
      author_id: tempAuthorId 
    });
    expect(res).toBeNull();
  });

  test('deletePostService debe retornar true si borra con éxito', async () => {
    const result = await deletePostService(tempPostId);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    if (tempPostId) await deletePostService(tempPostId);
    if (tempAuthorId) await deleteAuthorService(tempAuthorId);
    console.log("🧹 DB de Posts Service limpia.");
  });
});