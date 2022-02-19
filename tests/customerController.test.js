const controller = require('../src/controllers/customerController');
require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const customerModel = require('../src/models/customer');
const userModel = require('../src/models/user');
const userService = require('../src/services/user');

const depurator = require('../src/depurator');

describe("test customer controller", () => {

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

        describe("create customer", () => {
                test("valid customer", async () => {

                        let name = "tester";
                        let surname = "customer";
                        let newCustomer = await controller.createCustomer(name, surname, user);
                        expect(newCustomer).toBeInstanceOf(Object);
                        expect(newCustomer).toHaveProperty('name', name);
                        expect(newCustomer).toHaveProperty('surname', surname);
                        expect(newCustomer).toHaveProperty('creator', user._id);
                        expect(newCustomer).toHaveProperty('modifier', user._id);
                        expect(newCustomer).toHaveProperty('_id');
                        expect(newCustomer).toHaveProperty('updatedAt');
                        expect(newCustomer).toHaveProperty('createdAt');
                });

                test("double customer same parameters", async () => {

                        let name = "tester";
                        let surname = "customer";
                        await controller.createCustomer(name, surname, user);
                        let newCustomer = await controller.createCustomer(name, surname, user);
                        expect(newCustomer).toBeInstanceOf(Object);
                        expect(newCustomer).toHaveProperty('name', name);
                        expect(newCustomer).toHaveProperty('surname', surname);
                        expect(newCustomer).toHaveProperty('creator', user._id);
                        expect(newCustomer).toHaveProperty('modifier', user._id);
                        expect(newCustomer).toHaveProperty('_id');
                        expect(newCustomer).toHaveProperty('updatedAt');
                        expect(newCustomer).toHaveProperty('createdAt');
                });

                test("invalid customer name", async () => {

                        let name = "[tester";
                        let surname = "customer";
                        await expect(controller.createCustomer(name, surname, user))
                                .rejects
                                .toThrow();
                });

                test("invalid customer surname", async () => {

                        let name = "tester";
                        let surname = "cus%tomer";
                        await expect(controller.createCustomer(name, surname, user))
                                .rejects
                                .toThrow();
                });

        });

        describe("try to list customers", () => {
                test("list 3 customers", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let name2 = "testerB";
                        let surname2 = "customerB";
                        let customer2 = await controller.createCustomer(name2, surname2, user);

                        let name3 = "testerC";
                        let surname3 = "customerC";
                        let customer3 = await controller.createCustomer(name3, surname3, user);

                        let response = await controller.customers();
                        let expected = 3
                        expect(response.length).toBe(expected);
                });

                test("list 1 customer", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let response = await controller.customers();
                        let expected = 1
                        expect(response.length).toBe(expected);
                });

                test("list 0 customers", async () => {
                        let response = await controller.customers();
                        let expected = 0
                        expect(response.length).toBe(expected);
                });
        });

        describe("try to update customer", () => {

                test("update customer parameters", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newName = "testerB";
                        let newSurname = "customerB";
                        let updated = await controller.updateCustomer(customer1._id, newName, newSurname, null, user);

                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', depurator.depurateName(newName));
                        expect(updated).toHaveProperty('surname', depurator.depurateSurname(newSurname));
                        expect(updated).toHaveProperty('creator', user._id);
                        expect(updated).toHaveProperty('modifier', user._id);
                        expect(updated).toHaveProperty('_id', customer1._id);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update customer name", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newName = "testerB";
                        let updated = await controller.updateCustomer(customer1._id, newName, null, null, user);

                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', depurator.depurateName(newName));
                        expect(updated).toHaveProperty('surname', customer1.surname);
                        expect(updated).toHaveProperty('creator', user._id);
                        expect(updated).toHaveProperty('modifier', user._id);
                        expect(updated).toHaveProperty('_id', customer1._id);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid customer name", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newName = "tes[terB";
                        await expect(controller.updateCustomer(customer1._id, newName, null, null, user))
                                .rejects
                                .toThrow()


                });

                test("update customer surname", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newSurname = "customerB";
                        let updated = await controller.updateCustomer(customer1._id, null, newSurname, null, user);

                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', customer1.name);
                        expect(updated).toHaveProperty('surname', depurator.depurateSurname(newSurname));
                        expect(updated).toHaveProperty('creator', user._id);
                        expect(updated).toHaveProperty('modifier', user._id);
                        expect(updated).toHaveProperty('_id', customer1._id);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid customer name", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newName = "tes[terB";
                        await expect(controller.updateCustomer(customer1._id, newName, null, null, user))
                                .rejects
                                .toThrow()


                });


                test("update Not Found customer", async () => {

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        await controller.deleteCustomer(customer1._id);

                        let newName = "testerB";
                        await expect(controller.updateCustomer(customer1._id, newName, null, null, user))
                                .rejects
                                .toThrow()


                });

                test("update customer modifier", async () => {
                        let payloadUser2 = {
                                name: "testerB",
                                surname: "testerB",
                                username: "supertesterB",
                                email: "testerB@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let user2 = await userService.create(payloadUser2);

                        let name1 = "testerA";
                        let surname1 = "customerA";
                        let customer1 = await controller.createCustomer(name1, surname1, user);

                        let newSurname = "customerB";
                        let updated = await controller.updateCustomer(customer1._id, null, newSurname, null, user2);

                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', customer1.name);
                        expect(updated).toHaveProperty('surname', depurator.depurateSurname(newSurname));
                        expect(updated).toHaveProperty('creator', user._id);
                        expect(updated).toHaveProperty('modifier', user2._id);
                        expect(updated).toHaveProperty('_id', customer1._id);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                })
        });

        describe("try to get customer", () => {
                test("get customer", async () => {
                        let name = "tester";
                        let surname = "customer";
                        let newCustomer = await controller.createCustomer(name, surname, user);

                        let gotCustomer = await controller.customer(newCustomer._id);
                        expect(gotCustomer).toBeInstanceOf(Object);
                        expect(gotCustomer).toHaveProperty('name', newCustomer.name);
                        expect(gotCustomer).toHaveProperty('surname', newCustomer.surname);
                        expect(gotCustomer).toHaveProperty('creator', user._id);
                        expect(gotCustomer).toHaveProperty('modifier', user._id);
                        expect(gotCustomer).toHaveProperty('_id', newCustomer._id);
                        expect(gotCustomer).toHaveProperty('updatedAt');
                        expect(gotCustomer).toHaveProperty('createdAt', newCustomer.createdAt);

                });

                test("customer Not found", async () => {
                        let name = "tester";
                        let surname = "customer";
                        let newCustomer = await controller.createCustomer(name, surname, user);

                        await controller.deleteCustomer(newCustomer._id);

                        await expect(controller.customer(newCustomer._id))
                                .rejects
                                .toThrow();

                });
        });


        describe("try to delete", () => {
                test("delete customer", async () => {
                        let name = "tester";
                        let surname = "customer";
                        let newCustomer = await controller.createCustomer(name, surname, user);

                        let response = await controller.deleteCustomer(newCustomer._id);

                        expect(response).toEqual({ success: true });
                });

                test("delete Not found customer", async () => {
                        let name = "tester";
                        let surname = "customer";
                        let newCustomer = await controller.createCustomer(name, surname, user);

                        await controller.deleteCustomer(newCustomer._id);
                        let response = await controller.deleteCustomer(newCustomer._id);

                        expect(response).toEqual({ success: false });
                });
        });
});