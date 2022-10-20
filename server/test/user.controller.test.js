import { describe, expect, test } from "@jest/globals"; // https://jestjs.io/docs/tutorial-react
const request = require("supertest");
const app = require("../app");

describe("User", () => {
  // let token = ''
  beforeAll(async () => { 
    let response = await request(app).post("/api/auth/sign-in").send({
      username: "Cloud",
      password: "123456",
    });

    // token = response.body.data.Authorization
  })

  afterAll(done => {
    done()
  })

  test("User", async () => {
    let response = await request(app).get("/api/users/profile").set({User_id: 7})
    expect(response.status).toBe(200);

    response = await request(app).put("/api/users/profile").set({User_id: 7}).send({
      email: "asdfghjkl@test.com",
    })
    expect(response.status).toBe(200);

    response = await request(app).get("/api/users/search").set({User_id: 7})
    expect(response.status).toBe(200);

    response = await request(app).get("/api/users/followUsers").set({User_id: 7})
    expect(response.status).toBe(200);

    response = await request(app).post("/api/users/follow/2").set({User_id: 7})
    expect(response.status).toBe(200);

    response = await request(app).post("/api/users/unfollow/2").set({User_id: 7})
    expect(response.status).toBe(200);
  });
});
