const controller = require('../src/controllers/userController');
require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const userModel = require('../src/models/user');

const { ROLE } = require('../src/roles');


describe("test user controller", () => {
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

        describe("create user", () => {
                test("valid user", async () => {

                        let name = "tester";
                        let surname = "mysuperuser";
                        let username = "supertester";
                        let email = "tester@tes.com";
                        let password = "qqqAAA11%%CUA";

                        let newUser = await controller.createUser(name, surname, username, email, password);
                        expect(newUser).toBeInstanceOf(Object);
                        expect(newUser).toHaveProperty('name', name);
                        expect(newUser).toHaveProperty('surname', surname);
                        expect(newUser).toHaveProperty('username', username);
                        expect(newUser).toHaveProperty('email', email);
                        expect(newUser).toHaveProperty('password');
                        expect(newUser).toHaveProperty('_id');
                        expect(newUser).toHaveProperty('role', ROLE.ADMIN);
                        expect(newUser).toHaveProperty('updatedAt');
                        expect(newUser).toHaveProperty('createdAt');
                });

                test("invalid user same parameters", async () => {
                        let name = "tester";
                        let surname = "mysuperuser";
                        let username = "supertester";
                        let email = "tester@tes.com";
                        let password = "qqqAAA11%%CUA";

                        await controller.createUser(name, surname, username, email, password);
                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                });

                test("invalid user name", async () => {

                        let name = "te$ster";
                        let surname = "mysuperuser";
                        let username = "supertester";
                        let email = "tester@tes.com";
                        let password = "qqqAAA11%%CUA";

                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                });

                test("invalid user surname", async () => {

                        let name = "tester";
                        let surname = "mysupe%ruser";
                        let username = "supertester";
                        let email = "tester@tes.com";
                        let password = "qqqAAA11%%CUA";

                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                });

                test("invalid user username", async () => {

                        let name = "tester";
                        let surname = "mysuperuser";
                        let username = "su>pertester";
                        let email = "tester@tes.com";
                        let password = "qqqAAA11%%CUA";

                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                });

                test("invalid user email", async () => {

                        let name = "tester";
                        let surname = "mysuperuser";
                        let username = "supertester";
                        let email = "tester@tes.";
                        let password = "qqqAAA11%%CUA";

                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                });

                test("invalid user email", async () => {

                        let name = "tester";
                        let surname = "mysuperuser";
                        let username = "supertester";
                        let email = "tester@tes.com";
                        let password = "qqqAA";

                        await expect(controller.createUser(name, surname, username, email, password))
                                .rejects
                                .toThrow();
                })

        });

        describe("try to list users", () => {
                test("list 3 users", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "testerB";
                        let surnameB = "mysuperuserB";
                        let usernameB = "supertesterB";
                        let emailB = "testerb@test.com";
                        let passwordB = "qqqAAA11%%CUA";

                        await controller.createUser(nameB, surnameB, usernameB, emailB, passwordB);

                        let nameC = "testerC";
                        let surnameC = "mysuperuserC";
                        let usernameC = "supertesterC";
                        let emailC = "testerc@test.com";
                        let passwordC = "qqqAAA11%%CUA";

                        await controller.createUser(nameC, surnameC, usernameC, emailC, passwordC);

                        let response = await controller.users();
                        let expected = 3
                        expect(response.length).toBe(expected);
                });

                test("list 1 user", async () => {

                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let response = await controller.users();
                        let expected = 1
                        expect(response.length).toBe(expected);
                });

                test("list 0 users", async () => {
                        let response = await controller.users();
                        let expected = 0
                        expect(response.length).toBe(expected);
                });
        });


        describe("try to update user", () => {
                test("update all parameters", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "testerB";
                        let surnameB = "mysuperuserB";
                        let usernameB = "supertesterB";
                        let emailB = "testerb@test.com";
                        let passwordB = "qqqAAA11%%CUA";
                        let role = ROLE.BASIC;

                        let updated = await controller.updateUser(toUpdate._id, nameB, surnameB, usernameB, emailB, passwordB, role);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', nameB.toLowerCase());
                        expect(updated).toHaveProperty('surname', surnameB.toLowerCase());
                        expect(updated).toHaveProperty('username', usernameB.toLowerCase());
                        expect(updated).toHaveProperty('email', emailB.toLowerCase());
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.BASIC);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');

                });

                test("update user name", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "testerB";

                        let updated = await controller.updateUser(toUpdate._id, nameB, null, null, null, null, null);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', nameB.toLowerCase());
                        expect(updated).toHaveProperty('surname', toUpdate.surname);
                        expect(updated).toHaveProperty('username', toUpdate.username);
                        expect(updated).toHaveProperty('email', toUpdate.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.ADMIN);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid user name", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "te[sterB";

                        await expect(controller.updateUser(toUpdate._id, nameB, null, null, null, null, null))
                                .rejects
                                .toThrow();
                });


                test("update user surname", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let surnameB = "mysuperuserB";

                        let updated = await controller.updateUser(toUpdate._id, null, surnameB, null, null, null, null);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', toUpdate.name);
                        expect(updated).toHaveProperty('surname', surnameB.toLowerCase());
                        expect(updated).toHaveProperty('username', toUpdate.username);
                        expect(updated).toHaveProperty('email', toUpdate.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.ADMIN);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid surname", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let surname = "mysup%eruserB";

                        await expect(controller.updateUser(toUpdate._id, null, surname, null, null, null, null))
                                .rejects
                                .toThrow();
                });

                test("update user username", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let usernameB = "supertesterB";

                        let updated = await controller.updateUser(toUpdate._id, null, null, usernameB, null, null, null);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', toUpdate.name);
                        expect(updated).toHaveProperty('surname', toUpdate.surname);
                        expect(updated).toHaveProperty('username', usernameB.toLowerCase());
                        expect(updated).toHaveProperty('email', toUpdate.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.ADMIN);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid surname", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let usernameB = "super>testerB";

                        await expect(controller.updateUser(toUpdate._id, null, null, usernameB, null, null, null))
                                .rejects
                                .toThrow();
                });

                test("update duplicate username", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "testerB";
                        let surnameB = "mysuperuserB";
                        let usernameB = "supertesterB";
                        let emailB = "testerb@test.com";
                        let passwordB = "qqqAAA11%%CUA";

                        await controller.createUser(nameB, surnameB, usernameB, emailB, passwordB);

                        //MONGOOSE DONT CREATE INDEX AUTOMATICALY
                        await expect(controller.updateUser(toUpdate._id, null, null, usernameB, null, null, null))
                                .rejects
                                .toThrow();


                });

                test("update user email", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let emailB = "testerb@test.com";

                        let updated = await controller.updateUser(toUpdate._id, null, null, null, emailB, null, null);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', toUpdate.name);
                        expect(updated).toHaveProperty('surname', toUpdate.surname);
                        expect(updated).toHaveProperty('username', toUpdate.username);
                        expect(updated).toHaveProperty('email', emailB);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.ADMIN);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid email", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let emailB = "testerb@testcom";

                        await expect(controller.updateUser(toUpdate._id, null, null, null, emailB, null, null))
                                .rejects
                                .toThrow();
                });

                test("update duplicate email", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let nameB = "testerB";
                        let surnameB = "mysuperuserB";
                        let usernameB = "supertesterB";
                        let emailB = "testerb@test.com";
                        let passwordB = "qqqAAA11%%CUA";

                        await controller.createUser(nameB, surnameB, usernameB, emailB, passwordB);

                        //MONGOOSE DONT CREATE INDEX AUTOMATICALY
                        await expect(controller.updateUser(toUpdate._id, null, null, null, emailB, null, null))
                                .rejects
                                .toThrow();
                });


                test("update user password", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let passwordB = "qqqAAA11%%CUA";

                        let updated = await controller.updateUser(toUpdate._id, null, null, null, null, passwordB, null);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', toUpdate.name);
                        expect(updated).toHaveProperty('surname', toUpdate.surname);
                        expect(updated).toHaveProperty('username', toUpdate.username);
                        expect(updated).toHaveProperty('email', toUpdate.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.ADMIN);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid user password", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let passwordB = "qqqdddddddddd";

                        await expect(controller.updateUser(toUpdate._id, null, null, null, null, passwordB, null))
                                .rejects
                                .toThrow();
                });

                test("update user role", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let role = ROLE.BASIC

                        let updated = await controller.updateUser(toUpdate._id, null, null, null, null, null, role);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', toUpdate.name);
                        expect(updated).toHaveProperty('surname', toUpdate.surname);
                        expect(updated).toHaveProperty('username', toUpdate.username);
                        expect(updated).toHaveProperty('email', toUpdate.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('role', ROLE.BASIC);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');
                });

                test("update invalid user role", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                        let role = "blue"

                        await expect(controller.updateUser(toUpdate._id, null, null, null, null, null, role))
                                .rejects
                                .toThrow();
                });


                test("update User Not found", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let toUpdate = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                        await controller.deleteUser(toUpdate._id);

                        let newName = "testerB"
                        await expect(controller.updateUser(toUpdate._id, newName, null, null, null, null, null))
                                .rejects
                                .toThrow();
                });
        });


        describe("try to get user", () => {
                test("get user", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let newUser = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                        let gotUser = await controller.user(newUser._id);
                        expect(gotUser).toBeInstanceOf(Object);
                        expect(gotUser).toHaveProperty('name', newUser.name);
                        expect(gotUser).toHaveProperty('surname', newUser.surname);
                        expect(gotUser).toHaveProperty('username', newUser.username);
                        expect(gotUser).toHaveProperty('email', newUser.email);
                        expect(gotUser).toHaveProperty('password');
                        expect(gotUser).toHaveProperty('_id', newUser._id);
                        expect(gotUser).toHaveProperty('role', newUser.role);
                        expect(gotUser).toHaveProperty('updatedAt');
                        expect(gotUser).toHaveProperty('createdAt', newUser.createdAt);
                });

                test("get user", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let newUser = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                        await controller.deleteUser(newUser._id);

                        await expect(controller.user(newUser._id))
                                .rejects
                                .toThrow();
                });
        });

        describe("try to delete user", () => {
                test("delete user", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let newUser = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                        let response = await controller.deleteUser(newUser._id);

                        expect(response).toEqual({ success: true });
                });

                test("delete user", async () => {
                        let nameA = "testerA";
                        let surnameA = "mysuperuserA";
                        let usernameA = "supertesterA";
                        let emailA = "testera@test.com";
                        let passwordA = "qqqAAA11%%CUA";

                        let newUser = await controller.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                        await controller.deleteUser(newUser._id);
                        let response = await controller.deleteUser(newUser._id);

                        expect(response).toEqual({ success: false });
                });
        });
});