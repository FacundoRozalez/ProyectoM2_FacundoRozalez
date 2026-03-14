import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import * as authorsService from '../../src/services/authors.service.js';
import * as postsService from '../../src/services/posts.service.js';

describe('Comments API - Integration Tests', () => {
  let tempAuthorId;
  let tempPostId;
  let tempCommentId;

  beforeAll(async () => {
    const author = await authorsService.createAuthor({
      name: "Route Comm Tester",
      email: `rcomm_${Date.now()}@test.com`
    });
    tempAuthorId = author.id;

    const post = await postsService.createPost({
      title: "Post de Integración",
      content: "...",
      author_id: tempAuthorId
    });
    tempPostId = post.id;
  });

  test('POST /api/comments - Debe fallar si faltan campos (400)', async () => {
    const res = await request(app).post('/api/comments').send({ content: "Solo texto" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/obligatorios/);
  });

  test('POST /api/comments - Debe crear un comentario (201)', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({
        content: "Comentario desde Rutas",
        post_id: tempPostId,
        author_id: tempAuthorId
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    tempCommentId = res.body.id;
  });

  test('GET /api/comments/post/:postId - Debe traer comentarios del post', async () => {
    const res = await request(app).get(`/api/comments/post/${tempPostId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('DELETE /api/comments/:id - Debe retornar 204 No Content', async () => {
    const res = await request(app).delete(`/api/comments/${tempCommentId}`);
    expect(res.status).toBe(204);
  });

  test('DELETE /api/comments/:id - Debe retornar 404 si no existe', async () => {
    const res = await request(app).delete('/api/comments/999999');
    expect(res.status).toBe(404);
  });

  afterAll(async () => {
    if (tempPostId) await postsService.deletePost(tempPostId);
    if (tempAuthorId) await authorsService.deleteAuthor(tempAuthorId);
    console.log("🧹 DB de Comments Routes limpia.");
  });
});