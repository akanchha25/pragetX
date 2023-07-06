const request = require("supertest");
const app = require("../server");

// we can implement JEST mocking to only check API and not access the database
describe("GET /user/register", () => {
  it("should register a new user to the platform", async () => {
    const res = await request(app).post("/register").send({
      firstName: "Raghav",
      middleName: "",
      lastName: "Juyal",
      email: "raghavjuyal12@gmail.com",
      password: "Raghav123@",
      phoneNumber: "8978946994",
      role: "admin",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User saved successfully!");
  }, 60000);
});
