import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Authors API - Integration Tests (Supertest)', () => {
  let createdId;
  const uniqueEmail = `api_${Date.now()}@test.com`;

  test('GET /api/authors - Debe retornar 200 y el array', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/authors - Debe validar campos obligatorios (400)', async () => {
    const res = await request(app).post('/api/authors').send({ name: "Solo nombre" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El nombre y el email son campos obligatorios");
  });

  test('POST /api/authors - Debe crear exitosamente (201)', async () => {
    const res = await request(app).post('/api/authors').send({
      name: "API Integration",
      email: uniqueEmail,
      bio: "Test real"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('POST /api/authors - Debe dar 400 si el email está duplicado', async () => {
    const res = await request(app).post('/api/authors').send({ 
      name: "Repetido", 
      email: uniqueEmail 
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El dato ya existe (ej: el email ya está registrado)");
  });

  test('PUT /api/authors/:id - Debe actualizar (200)', async () => {
    const res = await request(app).put(`/api/authors/${createdId}`).send({
      name: "Nombre Actualizado",
      email: uniqueEmail, 
      bio: "Nueva bio"
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Nombre Actualizado");
  });

  test('PUT /api/authors/:id - Debe fallar si el nuevo email ya existe en otro autor (400)', async () => {
    const emailOtro = `otro_${Date.now()}@test.com`;
    await request(app).post('/api/authors').send({ name: "Autor B", email: emailOtro });

    const res = await request(app).put(`/api/authors/${createdId}`).send({
      name: "Cambiando a email ajeno",
      email: emailOtro
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El dato ya existe (ej: el email ya está registrado)");
  });

  test('GET /api/authors/:id - Debe dar 404 si el autor no existe', async () => {
    const res = await request(app).get('/api/authors/999999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Autor no encontrado');
  });

  test('PUT /api/authors/:id - Debe dar 404 si intentas editar un autor inexistente', async () => {
    const res = await request(app).put('/api/authors/999999').send({
      name: "Inexistente",
      email: "no@existe.com"
    });
    expect(res.status).toBe(404);
  });

  test('DELETE /api/authors/:id - Debe responder 204', async () => {
    const res = await request(app).delete(`/api/authors/${createdId}`);
    expect(res.status).toBe(204);
  });
});