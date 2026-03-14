import { describe, test, expect, afterAll } from 'vitest';
import * as authorsService from '../../src/services/authors.service.js';

describe('Authors Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;

  test('createAuthor debe insertar un autor y devolverlo', async () => {
    const nuevo = { name: "Unit Test", email: `unit_${Date.now()}@test.com`, bio: "Bio" };
    const author = await authorsService.createAuthor(nuevo);
    
    tempAuthorId = author.id;
    expect(author).toHaveProperty('id');
    expect(author.name).toBe(nuevo.name);
  });

  test('createAuthor debe lanzar error si el email ya existe', async () => {
    const duplicado = { name: "Otro", email: "repetido@test.com", bio: "Bio" };
    await authorsService.createAuthor(duplicado);
    
    // El segundo intento con el mismo email debe fallar
    await expect(authorsService.createAuthor(duplicado))
      .rejects.toThrow("EMAIL_EXISTS");
  });

  test('getAllAuthors debe traer una lista de la DB', async () => {
    const authors = await authorsService.getAllAuthors();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors.length).toBeGreaterThan(0);
  });

  test('updateAuthor debe retornar null si el ID no existe', async () => {
    const result = await authorsService.updateAuthor(999999, { name: "X", email: "x@x.com", bio: "X" });
    expect(result).toBeNull();
  });

  test('deleteAuthor debe retornar true si borra con éxito', async () => {
    const result = await authorsService.deleteAuthor(tempAuthorId);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    await authorsService.deleteAuthor(tempAuthorId);
    
    const allAuthors = await authorsService.getAllAuthors();
    const duplicado = allAuthors.find(a => a.email === "repetido@test.com");
    if (duplicado) await authorsService.deleteAuthor(duplicado.id);
    
    console.log("🧹 Base de datos de autores limpia.");
  });
});