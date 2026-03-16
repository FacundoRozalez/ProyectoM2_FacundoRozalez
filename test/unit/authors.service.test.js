import { describe, test, expect, afterAll } from 'vitest';
import { 
  createAuthorService, 
  getAllAuthorsService, 
  updateAuthorService, 
  deleteAuthorService 
} from '../../src/services/authors.service.js';

describe('Authors Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;

  test('createAuthorService debe insertar un autor y devolverlo', async () => {
    const nuevo = { name: "Unit Test", email: `unit_${Date.now()}@test.com`, bio: "Bio" };
    const author = await createAuthorService(nuevo);
    
    tempAuthorId = author.id;
    expect(author).toHaveProperty('id');
    expect(author.name).toBe(nuevo.name);
  });

  test('createAuthorService debe lanzar error si el email ya existe', async () => {
    const duplicado = { name: "Otro", email: "repetido@test.com", bio: "Bio" };
    
    try { await createAuthorService(duplicado); } catch (e) { /* ignore */ }
    
    await expect(createAuthorService(duplicado))
      .rejects.toThrow("EMAIL_EXISTS");
  });

  test('getAllAuthorsService debe traer una lista de la DB', async () => {
    const authors = await getAllAuthorsService();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors.length).toBeGreaterThan(0);
  });

  test('updateAuthorService debe retornar null si el ID no existe', async () => {
    const result = await updateAuthorService(999999, { name: "X", email: "x@x.com", bio: "X" });
    expect(result).toBeNull();
  });

  test('deleteAuthorService debe retornar true si borra con éxito', async () => {
    const result = await deleteAuthorService(tempAuthorId);
    expect(result).toBe(true);
  });

    
  afterAll(async () => {
    // Limpieza de seguridad
    if (tempAuthorId) {
      await deleteAuthorService(tempAuthorId);
    }
    
    const allAuthors = await getAllAuthorsService();
    const duplicado = allAuthors.find(a => a.email === "repetido@test.com");
    if (duplicado) {
      await deleteAuthorService(duplicado.id);
    }
    
    console.log("🧹 Base de datos de autores limpia.");
  });
});