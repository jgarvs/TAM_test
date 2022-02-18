require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const userModel = require('../src/models/user');
const user = require('../src/services/user');
const userService = require('../src/services/user');

describe("test customer service", () => {

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
        test("has a module", async () => {
                expect(userModel).toBeDefined();
        });

        test("new user", async () => {
                let payload = {
                        name: "tester",
                        surname: "tester",
                        username: "supertester",
                        email: "tester@tes.com",
                        password: "qqqAAA11%%CUA"
                }

                let newUser = await userService.create(payload);

                expect(newUser).toBeInstanceOf(Object);
                expect(newUser).toHaveProperty('name', payload.name);
                expect(newUser).toHaveProperty('surname', payload.surname);
                expect(newUser).toHaveProperty('username', payload.username);
                expect(newUser).toHaveProperty('email', payload.email);
                expect(newUser).toHaveProperty('password');
                expect(newUser).toHaveProperty('_id');
                expect(newUser).toHaveProperty('updatedAt');
                expect(newUser).toHaveProperty('createdAt');
        });

        describe("try to find user", () => {
                test("get user", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);

                        let gotUser = await userService.findById(testUser._id);
                        expect(gotUser).toBeInstanceOf(Object);
                        expect(gotUser).toHaveProperty('name', payload.name);
                        expect(gotUser).toHaveProperty('surname', payload.surname);
                        expect(gotUser).toHaveProperty('username', payload.username);
                        expect(gotUser).toHaveProperty('email', payload.email);
                        expect(gotUser).toHaveProperty('password');
                        expect(gotUser).toHaveProperty('_id');
                        expect(gotUser).toHaveProperty('updatedAt');
                        expect(gotUser).toHaveProperty('createdAt');
                });

                test("user NOT found", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);
                        await userService.delete(testUser._id);

                        let gotUser = await userService.findById(testUser._id);
                        expect(gotUser).toBeNull();
                });

                test("get user byUsername", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);

                        let gotUser = await userService.findByUserame(testUser.username);
                        expect(gotUser).toBeInstanceOf(Object);
                        expect(gotUser).toHaveProperty('name', payload.name);
                        expect(gotUser).toHaveProperty('surname', payload.surname);
                        expect(gotUser).toHaveProperty('username', payload.username);
                        expect(gotUser).toHaveProperty('email', payload.email);
                        expect(gotUser).toHaveProperty('password');
                        expect(gotUser).toHaveProperty('_id');
                        expect(gotUser).toHaveProperty('updatedAt');
                        expect(gotUser).toHaveProperty('createdAt');
                });

                test("user NOT found by username", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);
                        await userService.delete(testUser._id);

                        let gotUser = await userService.findByUserame(testUser.username);
                        expect(gotUser).toBeNull();
                });

                test("get user by email", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);

                        let gotUser = await userService.findByEmail(testUser.email);
                        expect(gotUser).toBeInstanceOf(Object);
                        expect(gotUser).toHaveProperty('name', payload.name);
                        expect(gotUser).toHaveProperty('surname', payload.surname);
                        expect(gotUser).toHaveProperty('username', payload.username);
                        expect(gotUser).toHaveProperty('email', payload.email);
                        expect(gotUser).toHaveProperty('password');
                        expect(gotUser).toHaveProperty('_id');
                        expect(gotUser).toHaveProperty('updatedAt');
                        expect(gotUser).toHaveProperty('createdAt');
                });

                test("user NOT found by email", async () => {
                        let payload = {
                                name: "tester",
                                surname: "tester",
                                username: "supertester",
                                email: "tester@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let testUser = await userService.create(payload);
                        await userService.delete(testUser._id);

                        let gotUser = await userService.findByEmail(testUser.email);
                        expect(gotUser).toBeNull();
                });
        });

        describe("try to list users", () => {
                test("list 3 users", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload1);

                        let payload2 = {
                                name: "testerB",
                                surname: "testerB",
                                username: "supertesterB",
                                email: "testerB@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload2);

                        let payload3 = {
                                name: "testerC",
                                surname: "testerC",
                                username: "supertesterC",
                                email: "testerC@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload3);

                        let users = await userService.list();
                        let expected = 3;

                        expect(users.length).toBe(expected);
                });

                test("list 1 user", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload1);

                        let users = await userService.list();
                        let expected = 1;

                        expect(users.length).toBe(expected);
                });

                test("list 0 users", async () => {
                        let users = await userService.list();
                        let expected = 0;

                        expect(users.length).toBe(expected);
                });
        });

        describe("try to delete user", () => {
                test("delete user from many", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let toDelete = await userService.create(payload1);

                        let payload2 = {
                                name: "testerB",
                                surname: "testerB",
                                username: "supertesterB",
                                email: "testerB@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload2);

                        let payload3 = {
                                name: "testerC",
                                surname: "testerC",
                                username: "supertesterC",
                                email: "testerC@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        await userService.create(payload3);

                        let beforeUsers = await userService.list();
                        let beforeExpected = 3;

                        expect(beforeUsers.length).toBe(beforeExpected);

                        let deleted = await userService.delete(toDelete._id);

                        expect(deleted).toBeInstanceOf(Object);
                        expect(deleted).toHaveProperty('name', toDelete.name);
                        expect(deleted).toHaveProperty('surname', toDelete.surname);
                        expect(deleted).toHaveProperty('username', toDelete.username);
                        expect(deleted).toHaveProperty('email', toDelete.email);
                        expect(deleted).toHaveProperty('password');
                        expect(deleted).toHaveProperty('_id');
                        expect(deleted).toHaveProperty('updatedAt');
                        expect(deleted).toHaveProperty('createdAt');

                        let afterUsers = await userService.list();
                        let afterExpected = 2;

                        expect(afterUsers.length).toBe(afterExpected);
                });

                test("delete user NOT FOUND", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let toDelete = await userService.create(payload1);

                        await userService.delete(toDelete._id);
                        let deleted = await userService.delete(toDelete._id);

                        expect(deleted).toBeNull();
                });
        })

        describe("try to update User", () => {
                test("update User parameter", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let toUpdate = await userService.create(payload1);

                        let changes = {
                                name: "testerB",
                                surname: "testerB",
                                username: "supertesterB",
                                email: "testerB@tes.com",
                                password: "qqqAAA11%%CUA"
                        }

                        let updated = await userService.update(toUpdate._id, changes);
                        expect(updated).toBeInstanceOf(Object);
                        expect(updated).toHaveProperty('name', changes.name);
                        expect(updated).toHaveProperty('surname', changes.surname);
                        expect(updated).toHaveProperty('username', changes.username);
                        expect(updated).toHaveProperty('email', changes.email);
                        expect(updated).toHaveProperty('password');
                        expect(updated).toHaveProperty('_id', toUpdate._id);
                        expect(updated).toHaveProperty('updatedAt');
                        expect(updated).toHaveProperty('createdAt');

                });

                test("update User NOT found", async () => {
                        let payload1 = {
                                name: "testerA",
                                surname: "testerA",
                                username: "supertesterA",
                                email: "testerA@tes.com",
                                password: "qqqAAA11%%CUA"
                        }
                        let toUpdate = await userService.create(payload1);

                        await userService.delete(toUpdate._id);

                        let changes = {
                                name: "testerB",
                                surname: "testerB",
                                username: "supertesterB",
                                email: "testerB@tes.com",
                                password: "qqqAAA11%%CUA"
                        }

                        let updated = await userService.update(toUpdate._id, changes);
                        expect(updated).toBeNull();
                });
        });
});