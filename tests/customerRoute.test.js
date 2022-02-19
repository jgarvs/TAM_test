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

        describe("GET /customers ", () => {

                describe("try to get customers list", () => {
                        test("list 3 customers", async () => {

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                await customerController.createCustomer(name1, surname1, user)

                                const name2 = "testerA";
                                const surname2 = "testerA"
                                await customerController.createCustomer(name2, surname2, user)

                                const name3 = "testerA";
                                const surname3 = "testerA"
                                await customerController.createCustomer(name3, surname3, user)

                                const response = await request(app).get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(3);
                        });

                        test("list 1 customer", async () => {

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                await customerController.createCustomer(name1, surname1, user)

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

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"
                                const response = await request(app).get('/api/customers')
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });
                });
        });

        describe("GET /customer ", () => {
                describe("try to get customer by id", () => {
                        test("get customer", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                const response = await request(app).get(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                let responseCustomer = response.body;
                                expect(responseCustomer).toBeInstanceOf(Object);
                                expect(responseCustomer).toHaveProperty('name', customer.name);
                                expect(responseCustomer).toHaveProperty('surname', customer.surname);
                                expect(responseCustomer).toHaveProperty('creator', customer.creator.toString());
                                expect(responseCustomer).toHaveProperty('modifier', customer.modifier.toString());
                                expect(responseCustomer).toHaveProperty('_id', customer._id.toString());
                                expect(responseCustomer).toHaveProperty('updatedAt');
                                expect(responseCustomer).toHaveProperty('createdAt');
                        });

                        test("get Not Found Customer", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);
                                await customerController.deleteCustomer(customer._id);

                                const response = await request(app).get(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"
                                const response = await request(app).get(`/api/customers/${customer._id}`)
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });
                });

        });


});
