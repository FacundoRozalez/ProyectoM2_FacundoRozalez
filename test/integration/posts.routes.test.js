import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import * as authorsService from '../../src/services/authors.service.js';

describe('Posts API - Integration Tests', () => {
  let tempAuthorId;
  let tempPostId;

  beforeAll(async () => {
    const author = await authorsService.createAuthor({
      name: "Route Tester",
      email: `routes_${Date.now()}@test.com`
    });
    tempAuthorId = author.id;
  });

  test('POST /api/posts - Debe fallar si faltan campos (400)', async () => {
    const res = await request(app).post('/api/posts').send({ title: "Incompleto" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/obligatorio/);
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

  test('GET /api/posts/author/:authorId - Debe traer posts del autor', async () => {
    const res = await request(app).get(`/api/posts/author/${tempAuthorId}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('DELETE /api/posts/:id - Debe retornar 204 No Content', async () => {
    const res = await request(app).delete(`/api/posts/${tempPostId}`);
    expect(res.status).toBe(204);
  });

  test('GET /api/posts/:id - Debe dar 404 si el post ya no existe', async () => {
    const res = await request(app).get(`/api/posts/${tempPostId}`);
    expect(res.status).toBe(404);
  });

  afterAll(async () => {
    if (tempAuthorId) await authorsService.deleteAuthor(tempAuthorId);
    console.log("🧹 DB de Posts Routes limpia.");
  });
});