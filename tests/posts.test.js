const request = require("supertest");
const app = require("../app");

describe("Posts API", () => {
  describe("GET /api/posts", () => {
    it("should return all posts", async () => {
      const res = await request(app).get("/api/posts");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });

  describe("GET /api/posts/:id", () => {
    it("should return a single post for valid id", async () => {
      const postId = 1;
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty("id", postId);
    });

    it("should return a 404 for an invalid post id", async () => {
      const res = await request(app).get("/api/posts/9999");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("POST /api/posts", () => {
    it("should create a new post", async () => {
      const newPost = {
        title: "Test Post",
        body: "This is a test post",
        tags: ["test", "blog"],
      };
      const res = await request(app).post("/api/posts").send(newPost);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toMatchObject(newPost);
    });
  });

  describe("PUT /api/posts/:id", () => {
    it("should update the post for valid id", async () => {
      const postId = 1;
      const updatedPost = {
        title: "Updated Title",
        body: "Updated body content",
        tags: ["updated", "blog"],
      };
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .send(updatedPost);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toMatchObject(updatedPost);
    });
  });

  describe("DELETE /api/posts/:id", () => {
    it("should delete the post for valid id", async () => {
      const postId = 1;
      const res = await request(app).delete(`/api/posts/${postId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toContain(postId.toString());
    });
  });
});
