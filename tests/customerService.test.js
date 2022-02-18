require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const customerModel = require('../src/models/customer');
const customerService = require('../src/services/customer');
const userModel = require('../src/models/user');
const userService = require('../src/services/user');

describe("test customer service", () => {

        let user;

        beforeAll(async () => {
                db.connect(TEST_DB);

                await customerModel.deleteMany({});
                await userModel.deleteMany({});

                let payload = {
                        name: "tester",
                        surname: "tester",
                        username: "supertester",
                        email: "tester@tes.com",
                        password: "qqqAAA11%%CUA"
                }
                user = await userService.create(payload);
        });
        afterEach(async () => {
                await customerModel.deleteMany({});
        });
        afterAll(async () => {
                await userModel.deleteMany({});
                db.close();
        });


        test("has a module", async () => {
                expect(customerModel).toBeDefined();
        });

        test("new customer", async () => {
                let payload = {
                        name: "testCustomer",
                        surname: "testCustomer",
                        creator: user._id,
                        modifier: user._id
                }
                let newCustomer = await customerService.create(payload);

                expect(newCustomer).toBeInstanceOf(Object);
                expect(newCustomer).toHaveProperty('name', payload.name);
                expect(newCustomer).toHaveProperty('surname', payload.surname);
                expect(newCustomer).toHaveProperty('creator');
                expect(newCustomer).toHaveProperty('modifier');
                expect(newCustomer).toHaveProperty('_id');
                expect(newCustomer).toHaveProperty('updatedAt');
                expect(newCustomer).toHaveProperty('createdAt');
        });

        describe("try to get customer", () => {
                test("get customer", async () => {
                        let payload = {
                                name: "testCustomer",
                                surname: "testCustomer",
                                creator: user._id,
                                modifier: user._id
                        }
                        let testCustomer = await customerService.create(payload);

                        let gotCustomer = await customerService.findById(testCustomer._id);

                        expect(gotCustomer).toBeInstanceOf(Object);
                        expect(gotCustomer).toHaveProperty('name', payload.name);
                        expect(gotCustomer).toHaveProperty('surname', payload.surname);
                        expect(gotCustomer).toHaveProperty('creator');
                        expect(gotCustomer).toHaveProperty('modifier');
                        expect(gotCustomer).toHaveProperty('_id');
                        expect(gotCustomer).toHaveProperty('updatedAt');
                        expect(gotCustomer).toHaveProperty('createdAt');
                });

                test("customer NOT found", async () => {
                        let payload = {
                                name: "testCustomer",
                                surname: "testCustomer",
                                creator: user._id,
                                modifier: user._id
                        }
                        let testCustomer = await customerService.create(payload);
                        await customerService.delete(testCustomer._id);

                        let gotCustomer = await customerService.findById(testCustomer._id);
                        expect(gotCustomer).toBeNull();
                });
        });

        describe("try to list customers", () => {
                test("list 3 customers", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload1);

                        let payload2 = {
                                name: "testCustomerB",
                                surname: "testCustomerB",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload2);

                        let payload3 = {
                                name: "testCustomerC",
                                surname: "testCustomerC",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload3);

                        let customers = await customerService.list();
                        let expected = 3;

                        expect(customers.length).toBe(expected);
                });

                test("list 1 customer", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload1);
                        let customers = await customerService.list();

                        let expected = 1;
                        expect(customers.length).toBe(expected);
                });

                test("list 0 customers", async () => {
                        let customers = await customerService.list();

                        let expected = 0;
                        expect(customers.length).toBe(expected);
                });
        });

        describe("try to delete customer", () => {
                test("delete customer from many", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        let toDelete = await customerService.create(payload1);

                        let payload2 = {
                                name: "testCustomerB",
                                surname: "testCustomerB",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload2);

                        let payload3 = {
                                name: "testCustomerC",
                                surname: "testCustomerC",
                                creator: user._id,
                                modifier: user._id
                        }
                        await customerService.create(payload3);

                        let beforeCustomers = await customerService.list();
                        let beforeExpected = 3;
                        expect(beforeCustomers.length).toBe(beforeExpected);

                        let deleted = await customerService.delete(toDelete._id);
                        expect(deleted).toBeInstanceOf(Object);
                        expect(deleted).toHaveProperty('name', toDelete.name);
                        expect(deleted).toHaveProperty('surname', toDelete.surname);
                        expect(deleted).toHaveProperty('creator', toDelete.creator);
                        expect(deleted).toHaveProperty('modifier', toDelete.modifier);
                        expect(deleted).toHaveProperty('_id', toDelete._id);
                        expect(deleted).toHaveProperty('updatedAt');
                        expect(deleted).toHaveProperty('createdAt', toDelete.createdAt);

                        let afterCustomers = await customerService.list();
                        let afterExpected = 2;
                        expect(afterCustomers.length).toBe(afterExpected);
                });

                test("delete Not found", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        let toDelete = await customerService.create(payload1);

                        await customerService.delete(toDelete._id);
                        let deleted = await customerService.delete(toDelete._id);
                        expect(deleted).toBeNull();
                });
        });

        describe("try to update customer", () => {
                test("update customer parameter", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        let toUpdate = await customerService.create(payload1);

                        let payload = {
                                name: "testCustomerX",
                                surname: "testCustomerX",
                        }
                        let updated = await customerService.update(toUpdate._id, payload);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('name', payload.name);
                        expect(updated).toHaveProperty('name', payload.surname);
                });

                test("update customer different modifier", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        let toUpdate = await customerService.create(payload1);

                        let userPayload = {
                                name: "testerM",
                                surname: "testerM",
                                username: "supertesterM",
                                email: "testerM@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        modifierUser = await userService.create(userPayload);

                        let payload = {
                                name: "testCustomerX",
                                modifier: modifierUser._id
                        }
                        let updated = await customerService.update(toUpdate._id, payload);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('name', payload.name);
                        expect(updated).toHaveProperty('modifier', modifierUser._id);
                });

                test("customer Not found", async () => {
                        let payload1 = {
                                name: "testCustomerA",
                                surname: "testCustomerA",
                                creator: user._id,
                                modifier: user._id
                        }
                        let toUpdate = await customerService.create(payload1);

                        await customerService.delete(toUpdate._id);

                        let payload = {
                                name: "testCustomerX",
                                surname: "testCustomerX",
                        }
                        let updated = await customerService.update(toUpdate._id, payload);
                        expect(updated).toBeNull();
                });
        });
});