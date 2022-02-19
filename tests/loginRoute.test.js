//test server
const app = require('../src/app');
const request = require('supertest');

//test DB
require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const userModel = require('../src/models/user');

const userController = require('../src/controllers/userController');
const { expectCt } = require('helmet');

describe("test login API", () => {

        beforeAll(async () => {
                db.connect(TEST_DB);
                await userModel.deleteMany({});

        });
        afterEach(async () => {
                await userModel.deleteMany({});
        });
        afterAll(async () => {
                await userModel.deleteMany({});
                db.close();
        });

        describe("POST /login", () => {
                describe("try to login", () => {

                        test("login with username", async () => {
                                let username = "testerAA"
                                let password = "qqqAAA11%%"
                                let email = "aaaa@bbbb.ccc";

                                await userController.createUser("testera", "testera", username, email, password);

                                const response = await request(app)
                                        .post("/api/login")
                                        .send({
                                                username: username,
                                                password: password
                                        });
                                let body = response.body;
                                expect(body).toHaveProperty('token');
                        });

                        test("login with email", async () => {
                                let username = "testerAA"
                                let password = "qqqAAA11%%"
                                let email = "aaaa@bbbb.ccc";

                                await userController.createUser("testera", "testera", username, email, password);

                                const response = await request(app)
                                        .post("/api/login")
                                        .send({
                                                email: email,
                                                password: password
                                        });
                                let body = response.body;
                                expect(body).toHaveProperty('token');
                        });

                        test("login with username but bad password input", async () => {
                                let username = "testerAA"
                                let password = "qqqAAA11%%"

                                await userController.createUser("testera", "testera", username, "aaaa@bbbb.ccc", password);

                                let badPassword = "pppAAA11%%"

                                const response = await request(app)
                                        .post("/api/login")
                                        .send({
                                                username: username,
                                                password: badPassword
                                        });
                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });

                        test("login with email but bad password input", async () => {
                                let username = "testerAA"
                                let password = "qqqAAA11%%"
                                let email = "aaaa@bbbb.ccc";

                                await userController.createUser("testera", "testera", username, email, password);

                                let badPassword = "pppAAA11%%"

                                const response = await request(app)
                                        .post("/api/login")
                                        .send({
                                                email: email,
                                                password: badPassword
                                        });
                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });

                        test("user Not found", async () => {
                                let username = "testerAA"
                                let password = "qqqAAA11%%"

                                const response = await request(app)
                                        .post("/api/login")
                                        .send({
                                                username: username,
                                                password: password
                                        });
                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });
                });
        });
});