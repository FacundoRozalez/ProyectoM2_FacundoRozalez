import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import * as postsService from '../../src/services/posts.service.js';
import * as authorsService from '../../src/services/authors.service.js';

describe('Posts Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;
  let tempPostId;

  // Creamos un autor real porque el service de posts valida que exista
  beforeAll(async () => {
    const author = await authorsService.createAuthor({
      name: "Service Tester",
      email: `service_${Date.now()}@test.com`,
      bio: "Test Bio"
    });
    tempAuthorId = author.id;
  });

  test('createPost debe insertar un post y devolverlo', async () => {
    const nuevoPost = {
      title: "Post de Prueba",
      content: "Contenido del post",
      author_id: tempAuthorId,
      published: true
    };
    const post = await postsService.createPost(nuevoPost);
    tempPostId = post.id;

    expect(post).toHaveProperty('id');
    expect(post.title).toBe(nuevoPost.title);
  });

  test('createPost debe lanzar error si el autor no existe', async () => {
    const postInvalido = { title: "X", content: "X", author_id: 999999 };
    await expect(postsService.createPost(postInvalido))
      .rejects.toThrow("AUTHOR_NOT_FOUND");
  });

  test('getAllPosts debe incluir el author_name (JOIN)', async () => {
    const posts = await postsService.getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    // Buscamos el que acabamos de crear
    const miPost = posts.find(p => p.id === tempPostId);
    expect(miPost).toHaveProperty('author_name');
    expect(miPost.author_name).toBe("Service Tester");
  });

  test('deletePost debe retornar true si borra con éxito', async () => {
    const result = await postsService.deletePost(tempPostId);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    // Limpieza final
    if (tempPostId) await postsService.deletePost(tempPostId);
    if (tempAuthorId) await authorsService.deleteAuthor(tempAuthorId);
    console.log("🧹 DB de Posts Service limpia.");
  });
});