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

const depurator = require('../src/depurator');

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

                                const response = await request(app)
                                        .get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(1);
                        });

                        test("list 0 customers", async () => {
                                const response = await request(app)
                                        .get('/api/customers')
                                        .set('Authorization', token)
                                let customers = response.body;

                                expect(customers.length).toBe(0);
                        });

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"
                                const response = await request(app)
                                        .get('/api/customers')
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

                                const response = await request(app)
                                        .get(`/api/customers/${customer._id}`)
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

                                const response = await request(app)
                                        .get(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                const response = await request(app)
                                        .get(`/api/customers/${customer._id}`)
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });
                });

        });

        describe("POST /customer ", () => {
                describe("try to create customer", () => {
                        test("create customer", async () => {

                                let payload = {
                                        name: "testCostumer",
                                        surname: "testCostumer"
                                }

                                const response = await request(app)
                                        .post(`/api/customers`)
                                        .set('Authorization', token)
                                        .send(payload);

                                let newCostumer = response.body;
                                expect(newCostumer).toBeInstanceOf(Object);
                                expect(newCostumer).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(newCostumer).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(newCostumer).toHaveProperty('creator', user._id.toString());
                                expect(newCostumer).toHaveProperty('modifier', user._id.toString());
                                expect(newCostumer).toHaveProperty('_id');
                                expect(newCostumer).toHaveProperty('updatedAt');
                                expect(newCostumer).toHaveProperty('createdAt');
                        });

                        test("create customer invalid name", async () => {

                                let payload = {
                                        name: "testCo#stumer",
                                        surname: "testCostumer"
                                }

                                const response = await request(app)
                                        .post(`/api/customers`)
                                        .set('Authorization', token)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });

                        test("create customer invalid surname", async () => {

                                let payload = {
                                        name: "testCostumer",
                                        surname: "testCos/tumer"
                                }

                                const response = await request(app)
                                        .post(`/api/customers`)
                                        .set('Authorization', token)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"

                                let payload = {
                                        name: "testCostumer",
                                        surname: "testCos/tumer"
                                }

                                const response = await request(app).post(`/api/customers`)
                                        .set('Authorization', badToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });
                })
        });

        describe("DELETE /customer", () => {
                describe("try to delete a customer", () => {
                        test("delete customer", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                const response = await request(app)
                                        .delete(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                let body = response.body;
                                expect(body).toEqual({ success: true });
                        });

                        test("delete customer twice", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                await request(app)
                                        .delete(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                const response = await request(app)
                                        .delete(`/api/customers/${customer._id}`)
                                        .set('Authorization', token);

                                let body = response.body;
                                expect(body).toEqual({ success: false });
                        });

                        test("try to send bad token", async () => {
                                const badToken = "asdlklsadfasdjfjjqjqewfjfsdn.alfkjkfsdasfj"

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                const response = await request(app)
                                        .delete(`/api/customers/${customer._id}`)
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });
                });
        })

        describe("PATCH /customer", () => {
                describe("try to update a customer", () => {
                        test("update customer all parameters", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        name: "testCostumer",
                                        surname: "testCostumer"
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', token)
                                        .send(payload)

                                let newCostumer = response.body;
                                expect(newCostumer).toBeInstanceOf(Object);
                                expect(newCostumer).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(newCostumer).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(newCostumer).toHaveProperty('creator', user._id.toString());
                                expect(newCostumer).toHaveProperty('modifier', user._id.toString());
                                expect(newCostumer).toHaveProperty('_id');
                                expect(newCostumer).toHaveProperty('updatedAt');
                                expect(newCostumer).toHaveProperty('createdAt');
                        });

                        test("update customer modifier", async () => {
                                let secondUsername = "testerBB"
                                let secondUser = await userController.createUser("testerb", "testerb", secondUsername, "dddd@bbbb.ccc", password);

                                const loginResponse = await request(app)
                                        .post("/api/login")
                                        .send({
                                                username: secondUsername,
                                                password: password
                                        });
                                let secondToken = loginResponse.body.token;

                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        name: "testCostumer",
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', secondToken)
                                        .send(payload)
                                let updatedCostumer = response.body;
                                expect(updatedCostumer).toBeInstanceOf(Object);
                                expect(updatedCostumer).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(updatedCostumer).toHaveProperty('surname', customer.surname);
                                expect(updatedCostumer).toHaveProperty('creator', user._id.toString());
                                expect(updatedCostumer).toHaveProperty('modifier', secondUser._id.toString());
                                expect(updatedCostumer).toHaveProperty('_id', customer._id.toString());
                                expect(updatedCostumer).toHaveProperty('updatedAt');
                                expect(updatedCostumer).toHaveProperty('createdAt');

                        });

                        test("update customer name", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        name: "testCostumer",
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', token)
                                        .send(payload)

                                let updatedCostumer = response.body;
                                expect(updatedCostumer).toBeInstanceOf(Object);
                                expect(updatedCostumer).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(updatedCostumer).toHaveProperty('surname', customer.surname);
                                expect(updatedCostumer).toHaveProperty('creator', user._id.toString());
                                expect(updatedCostumer).toHaveProperty('modifier', user._id.toString());
                                expect(updatedCostumer).toHaveProperty('_id');
                                expect(updatedCostumer).toHaveProperty('updatedAt');
                                expect(updatedCostumer).toHaveProperty('createdAt');
                        });

                        test("update customer with invalid name", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        name: "testCostumer<",
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', token)
                                        .send(payload)

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });

                        });

                        test("update customer surname", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        surname: "testCostumer"
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', token)
                                        .send(payload)

                                let updatedCostumer = response.body;
                                expect(updatedCostumer).toBeInstanceOf(Object);
                                expect(updatedCostumer).toHaveProperty('name', customer.name);
                                expect(updatedCostumer).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(updatedCostumer).toHaveProperty('creator', user._id.toString());
                                expect(updatedCostumer).toHaveProperty('modifier', user._id.toString());
                                expect(updatedCostumer).toHaveProperty('_id');
                                expect(updatedCostumer).toHaveProperty('updatedAt');
                                expect(updatedCostumer).toHaveProperty('createdAt');
                        });

                        test("update customer surname", async () => {
                                const name1 = "testerA";
                                const surname1 = "testerA"
                                let customer = await customerController.createCustomer(name1, surname1, user);

                                let payload = {
                                        surname: "#testCostumer"
                                }

                                const response = await request(app)
                                        .patch(`/api/customers/${customer._id}`)
                                        .set('Authorization', token)
                                        .send(payload)

                                let body = response.body;
                                expect(body).toEqual({ message: 'we found an error' });
                        });
                });
        });
});
