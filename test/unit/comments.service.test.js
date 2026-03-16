import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { 
  createCommentService, 
  getCommentsByPostService, 
  getAllCommentsService, 
  deleteCommentService 
} from '../../src/services/comments.service.js';
import { createAuthorService, deleteAuthorService } from '../../src/services/authors.service.js';
import { createPostService, deletePostService } from '../../src/services/posts.service.js';

describe('Comments Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;
  let tempPostId;
  let tempCommentId;

  beforeAll(async () => {
    const author = await createAuthorService({
      name: "Service Comm Tester",
      email: `scomm_${Date.now()}@test.com`
    });
    tempAuthorId = author.id;

    const post = await createPostService({
      title: "Post para Comentarios",
      content: "Contenido",
      author_id: tempAuthorId
    });
    tempPostId = post.id;
  });

  test('createCommentService debe insertar un comentario y devolverlo', async () => {
    const nuevo = { post_id: tempPostId, author_id: tempAuthorId, content: "Test Unitario" };
    const comment = await createCommentService(nuevo);
    tempCommentId = comment.id;

    expect(comment).toHaveProperty('id');
    expect(comment.content).toBe("Test Unitario");
  });

  test('createCommentService debe fallar si el post no existe (FK Error)', async () => {
    const errorData = { post_id: 999999, author_id: tempAuthorId, content: "X" };
    await expect(createCommentService(errorData)).rejects.toThrow();
  });

  test('getCommentsByPostService debe traer una lista con author_name (JOIN)', async () => {
    const comments = await getCommentsByPostService(tempPostId);
    expect(Array.isArray(comments)).toBe(true);
    if (comments.length > 0) {
      expect(comments[0]).toHaveProperty('author_name');
    }
  });

  test('getAllCommentsService debe traer todos los comentarios con author_name', async () => {
    const comments = await getAllCommentsService();
    expect(Array.isArray(comments)).toBe(true);
    const miComment = comments.find(c => c.content === "Test Unitario");
    if (miComment) {
      expect(miComment).toHaveProperty('author_name');
      expect(miComment.author_name).toBe("Service Comm Tester");
    }
  });

  test('deleteCommentService debe retornar true si borra con éxito', async () => {
    const result = await deleteCommentService(tempCommentId);
    expect(result).toBe(true);
  });
  
  afterAll(async () => {
    if (tempCommentId) await deleteCommentService(tempCommentId);
    if (tempPostId) await deletePostService(tempPostId);
    if (tempAuthorId) await deleteAuthorService(tempAuthorId);
    console.log("🧹 DB de Comments Service limpia.");
  });
});