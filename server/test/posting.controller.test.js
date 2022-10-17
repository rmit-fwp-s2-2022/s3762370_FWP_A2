import { describe, expect, test } from "@jest/globals";
const request = require("supertest");
const app = require("../app");

describe("Postings", () => {
  let token = "";
  beforeAll(async () => {
    let response = await request(app).post("/api/auth/sign-in").send({
      email: "test@abc.com",
      password: "123456",
    });

    token = response.body.data.Authorization;
  });

  afterAll((done) => {
    done();
  });

  test("Postings", async () => { 
    let response = await request(app)
      .post("/api/postings")
      .set({ Authorization: token })
      .send({
        content: "bla,bla,bla",
        url: "aaaaaa",
      });
    expect(response.status).toBe(200);
    let posting = response.body.data;
    
    response = await request(app)
      .put("/api/postings/" + posting.posting_id)
      .set({ Authorization: token })
      .send({
        content: "lalalalal",
      });
    expect(response.status).toBe(200);

    response = await request(app)
      .post("/api/postings/reply/" + posting.posting_id)
      .set({ Authorization: token })
      .send({
        content: "alalalalal",
      });
    expect(response.status).toBe(200);

    response = await request(app)
      .delete("/api/postings/" + posting.posting_id)
      .set({ Authorization: token })
    expect(response.status).toBe(200);
  });
});
