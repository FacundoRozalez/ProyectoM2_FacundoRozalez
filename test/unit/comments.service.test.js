import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import * as commentsService from '../../src/services/comments.service.js';
import * as postsService from '../../src/services/posts.service.js';
import * as authorsService from '../../src/services/authors.service.js';

describe('Comments Service - Unit Tests (DB Real)', () => {
  let tempAuthorId;
  let tempPostId;
  let tempCommentId;

  beforeAll(async () => {
    // Necesitamos autor y post para que el comentario sea válido
    const author = await authorsService.createAuthor({
      name: "Service Comm Tester",
      email: `scomm_${Date.now()}@test.com`
    });
    tempAuthorId = author.id;

    const post = await postsService.createPost({
      title: "Post para Comentarios",
      content: "Contenido",
      author_id: tempAuthorId
    });
    tempPostId = post.id;
  });

  test('createComment debe insertar un comentario y devolverlo', async () => {
    const nuevo = { post_id: tempPostId, author_id: tempAuthorId, content: "Test Unitario" };
    const comment = await commentsService.createComment(nuevo);
    tempCommentId = comment.id;

    expect(comment).toHaveProperty('id');
    expect(comment.content).toBe("Test Unitario");
  });

  test('createComment debe lanzar POST_NOT_FOUND si el post no existe', async () => {
    const errorData = { post_id: 999999, author_id: tempAuthorId, content: "X" };
    await expect(commentsService.createComment(errorData))
      .rejects.toThrow("POST_NOT_FOUND");
  });

  test('getCommentsByPost debe traer una lista con author_name (JOIN)', async () => {
    const comments = await commentsService.getCommentsByPost(tempPostId);
    expect(Array.isArray(comments)).toBe(true);
    if (comments.length > 0) {
      expect(comments[0]).toHaveProperty('author_name');
    }
  });

  test('deleteComment debe retornar true si borra con éxito', async () => {
    const result = await commentsService.deleteComment(tempCommentId);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    if (tempCommentId) await commentsService.deleteComment(tempCommentId);
    if (tempPostId) await postsService.deletePost(tempPostId);
    if (tempAuthorId) await authorsService.deleteAuthor(tempAuthorId);
    console.log("🧹 DB de Comments Service limpia.");
  });
});