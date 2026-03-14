import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Authors API - Integration Tests (Supertest)', () => {
  let createdId;

  test('GET /api/authors - Debe retornar 200 y el array', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/authors - Debe validar campos obligatorios (400)', async () => {
    const res = await request(app).post('/api/authors').send({ name: "Solo nombre" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El correo electrónico es obligatorio');
  });

  test('POST /api/authors - Debe crear exitosamente (201)', async () => {
    const res = await request(app).post('/api/authors').send({
      name: "API Integration",
      email: `api_${Date.now()}@test.com`,
      bio: "Test real"
    });
    createdId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('PUT /api/authors/:id - Debe actualizar (200)', async () => {
    const res = await request(app).put(`/api/authors/${createdId}`).send({
      name: "Nombre Actualizado",
      email: `update_${Date.now()}@test.com`,
      bio: "Nueva bio"
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Nombre Actualizado");
  });

  test('DELETE /api/authors/:id - Debe responder 204', async () => {
    const res = await request(app).delete(`/api/authors/${createdId}`);
    expect(res.status).toBe(204);
  });

  test('GET /api/authors/:id - Debe dar 404 si fue borrado', async () => {
    const res = await request(app).get(`/api/authors/${createdId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Autor no encontrado');
  });
});