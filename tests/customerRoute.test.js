//test server
const app = require('../src/app');
const request = require('supertest');

//test DB
require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const customerModel = require('../src/models/customer');
const userModel = require('../src/models/user');
const userController = require('../src/controllers/userController');
const customerController = require('../src/controllers/customerController');

describe("test customer API", () => {
        const username = "testerAA"
        const password = "qqqAAA11%%"

        let user

        beforeAll(async () => {
                db.connect(TEST_DB);

                await customerModel.deleteMany({});
                await userModel.deleteMany({});

                user = await userController.createUser("testera", "testera", username, "aaaa@bbbb.ccc", password);
        });
        afterEach(async () => {
                await customerModel.deleteMany({});
        });
        afterAll(async () => {
                await userModel.deleteMany({});
                db.close();
        });

        describe("GET /customers ", () => {
                let token
                beforeEach(async () => {
                        const response = await request(app)
                                .post("/api/login")
                                .send({
                                        username: username,
                                        password: password
                                });
                        token = response.body.token;
                });

                describe("try to get customers list", () => {
                        test("list 3 customers", async () => {

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                customerController.createCustomer(name1, surname1, user)

                                const name2 = "testerA";
                                const surname2 = "testerA"
                                customerController.createCustomer(name2, surname2, user)

                                const name3 = "testerA";
                                const surname3 = "testerA"
                                customerController.createCustomer(name3, surname3, user)

                                const response = await request(app).get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(3);
                        });

                        test("list 1 customer", async () => {

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                customerController.createCustomer(name1, surname1, user)

                                const response = await request(app).get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(1);
                        });

                        test("list 0 customers", async () => {
                                const response = await request(app).get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(0);
                        });
                });
        });
});
