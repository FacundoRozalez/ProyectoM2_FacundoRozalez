import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { createAuthorService, deleteAuthorService } from '../../src/services/authors.service.js';
import { deletePostService } from '../../src/services/posts.service.js';

describe('Posts API - Integration Tests', () => {
  let tempAuthorId;
  let tempPostId;

  beforeAll(async () => {
    const author = await createAuthorService({
      name: "Route Tester",
      email: `routes_${Date.now()}@test.com`
    });
    tempAuthorId = author.id;
  });

  test('GET /api/posts - Debe retornar 200 y la lista completa (Línea 15)', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/posts - Debe fallar si faltan campos (400)', async () => {
    const res = await request(app).post('/api/posts').send({}); 
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El título es obligatorio");
  });

  test('POST /api/posts - Debe crear un post (201)', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: "Post de Integración",
        content: "Contenido",
        author_id: tempAuthorId
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    tempPostId = res.body.id;
  });

  test('POST /api/posts - Debe fallar si el author_id no existe (400 FK)', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: "Post Huérfano",
        content: "Contenido",
        author_id: 999999
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El recurso relacionado no existe (Autor o Post inexistente)");
  });

  test('GET /api/posts/:id - Debe dar 404 si el post no existe (Línea 24)', async () => {
    const res = await request(app).get('/api/posts/999999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Post no encontrado");
  });

  test('GET /api/posts/author/:authorId - Debe traer posts del autor (Línea 35)', async () => {
    const res = await request(app).get(`/api/posts/author/${tempAuthorId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/posts/:id - Debe dar 404 si el post a editar no existe (Línea 55)', async () => {
    const res = await request(app).put('/api/posts/999999').send({
      title: "Update", 
      content: "Update", 
      author_id: tempAuthorId
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Post no encontrado');
  });

  test('DELETE /api/posts/:id - Debe retornar 204 No Content', async () => {
    const res = await request(app).delete(`/api/posts/${tempPostId}`);
    expect(res.status).toBe(204);
  });

  afterAll(async () => {
    if (tempAuthorId) await deleteAuthorService(tempAuthorId);
    console.log("🧹 DB de Posts Routes limpia.");
  });
});