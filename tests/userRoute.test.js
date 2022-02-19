//test server
const app = require('../src/app');
const request = require('supertest');

//test DB
require('dotenv').config();
const TEST_DB = process.env.TEST_DB;
const db = require('../src/db');

const userModel = require('../src/models/user');
const userController = require('../src/controllers/userController');

const depurator = require('../src/depurator');
const { ROLE } = require('../src/roles');
const errors = require('../src/customErrorHandler');

describe("test customer API", () => {

        let adminUser;
        let adminToken;
        const adminName = "admintestername";
        const adminSurname = "admintestersurname";
        const adminUsername = "admintesterusername";
        const adminEmail = "admin@bbbb.ccc";
        const adminPassword = "qqqAAA11%%";


        let basicUser;
        let basicToken;
        const basicName = "basictestername";
        const basicSurname = "basictestersurname";
        const basicUsername = "basictesterusername";
        const basicEmail = "basic@bbbb.ccc";
        const basicPassword = "qqqAAA11%%";

        let badToken = "ldkldsnnasvndknjknjasdkjdkbj";

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

        beforeEach(async () => {
                await userModel.deleteMany({});

                adminUser = await userController.createUser(adminName, adminSurname, adminUsername, adminEmail, adminPassword);

                basicUser = await userController.createUser(basicName, basicSurname, basicUsername, basicEmail, basicPassword);
                basicUser = await userController.updateUser(basicUser._id, null, null, null, null, null, ROLE.BASIC);

                const adminResponse = await request(app)
                        .post("/api/login")
                        .send({
                                username: adminUsername,
                                password: adminPassword
                        });
                adminToken = adminResponse.body.token;

                const basicResponse = await request(app)
                        .post("/api/login")
                        .send({
                                username: basicUsername,
                                password: basicPassword
                        });
                basicToken = basicResponse.body.token;
        });

        describe("GET /users ", () => {
                describe("try to get customers list", () => {
                        test("list 5 users", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                await userController.createUser(nameB, surnameB, usernameB, emailB, passwordB);

                                let nameC = "testerC";
                                let surnameC = "mysuperuserC";
                                let usernameC = "supertesterC";
                                let emailC = "testerc@test.com";
                                let passwordC = "qqqAAA11%%CUA";

                                await userController.createUser(nameC, surnameC, usernameC, emailC, passwordC);

                                const response = await request(app)
                                        .get('/api/users')
                                        .set('Authorization', adminToken)
                                let users = response.body;
                                expect(users.length).toBe(2 + 3);
                        });

                        test("list 5 users role not allowed", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                await userController.createUser(nameB, surnameB, usernameB, emailB, passwordB);

                                let nameC = "testerC";
                                let surnameC = "mysuperuserC";
                                let usernameC = "supertesterC";
                                let emailC = "testerc@test.com";
                                let passwordC = "qqqAAA11%%CUA";

                                await userController.createUser(nameC, surnameC, usernameC, emailC, passwordC);

                                const response = await request(app)
                                        .get('/api/users')
                                        .set('Authorization', basicToken)
                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("list 2 users", async () => {
                                const response = await request(app)
                                        .get('/api/users')
                                        .set('Authorization', adminToken)
                                let users = response.body;
                                expect(users.length).toBe(2);
                        });

                        test("try to send bad token", async () => {
                                const response = await request(app)
                                        .get('/api/users')
                                        .set('Authorization', badToken)
                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });
                });
        });


        describe("GET /customer ", () => {
                describe("try to get customer by id", () => {
                        test("get user", async () => {
                                const response = await request(app)
                                        .get(`/api/users/${basicUser._id}`)
                                        .set('Authorization', adminToken);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(basicUser.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(basicUser.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(basicUser.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(basicUser.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', ROLE.BASIC);
                                expect(responseUser).toHaveProperty('_id', basicUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');
                        });

                        test("get user role not allowed", async () => {
                                const response = await request(app)
                                        .get(`/api/users/${basicUser._id}`)
                                        .set('Authorization', basicToken);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("get Not Found Customer", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                let testUser = await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                                await userController.deleteUser(testUser._id);

                                const response = await request(app)
                                        .get(`/api/users/${basicUser._id}`)
                                        .set('Authorization', basicToken);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });

                        test("try to send bad token", async () => {
                                const response = await request(app)
                                        .get(`/api/users/${basicUser._id}`)
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });
                });
        });

        describe("POST /user ", () => {
                describe("try to create user", () => {
                        test("create user", async () => {

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(payload.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(payload.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', ROLE.ADMIN);
                                expect(responseUser).toHaveProperty('_id');
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');
                        });

                        test("create user role not allowed", async () => {

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', basicToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("create user invalid name", async () => {

                                let nameB = "tes#terB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("create user invalid surname", async () => {

                                let nameB = "testerB";
                                let surnameB = "mysuperus()erB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("create user invalid username", async () => {

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertes=terB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("create user invalid email", async () => {

                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("create user invalid password", async () => {

                                let nameB = "tes#terB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("try to send bad token", async () => {
                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB
                                }

                                const response = await request(app)
                                        .post(`/api/users`)
                                        .set('Authorization', badToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });
                });
        });


        describe("DELETE /user", () => {
                describe("try to delete an user", () => {
                        test("delete user", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                let testUser = await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                                const response = await request(app)
                                        .delete(`/api/users/${testUser._id}`)
                                        .set('Authorization', adminToken);

                                let body = response.body;
                                expect(body).toEqual({ success: true });
                        });

                        test("delete user role not allowed", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                let testUser = await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                                const response = await request(app)
                                        .delete(`/api/users/${testUser._id}`)
                                        .set('Authorization', basicToken);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });

                        test("delete user twice", async () => {
                                let nameA = "testerA";
                                let surnameA = "mysuperuserA";
                                let usernameA = "supertesterA";
                                let emailA = "testera@test.com";
                                let passwordA = "qqqAAA11%%CUA";

                                let testUser = await userController.createUser(nameA, surnameA, usernameA, emailA, passwordA);
                                await request(app)
                                        .delete(`/api/users/${testUser._id}`)
                                        .set('Authorization', adminToken);
                                const response = await request(app)
                                        .delete(`/api/users/${testUser._id}`)
                                        .set('Authorization', adminToken);

                                let body = response.body;
                                expect(body).toEqual({ success: false });
                        });

                        test("try to send bad token", async () => {
                                const response = await request(app)
                                        .delete(`/api/users/${basicUser._id}`)
                                        .set('Authorization', badToken);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });
                });
        });

        describe("PATCH /user", () => {
                describe("try to update a user", () => {
                        test("update user all parameters", async () => {
                                let nameB = "testerB";
                                let surnameB = "mysuperuserB";
                                let usernameB = "supertesterB";
                                let emailB = "testerb@test.com";
                                let passwordB = "qqqAAA11%%CUA";

                                let payload = {
                                        name: nameB,
                                        surname: surnameB,
                                        username: usernameB,
                                        email: emailB,
                                        password: passwordB,
                                        role: ROLE.BASIC
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(payload.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(payload.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', ROLE.BASIC);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });

                        test("update user name", async () => {
                                let nameB = "testerB";

                                let payload = {
                                        name: nameB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(payload.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(adminUser.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(adminUser.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(adminUser.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', adminUser.role);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });


                        test("update user invalid name", async () => {
                                let nameB = ")testerB";

                                let payload = {
                                        name: nameB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });

                        test("update user surname", async () => {
                                let surnameB = "mysuperuserB";

                                let payload = {
                                        surname: surnameB,
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(adminUser.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(payload.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(adminUser.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(adminUser.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', adminUser.role);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });

                        test("update user invalid surname", async () => {
                                let surnameB = "mysuperus.erB";

                                let payload = {
                                        surname: surnameB,
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });

                        test("update user username", async () => {
                                let usernameB = "supertesterB";

                                let payload = {
                                        username: usernameB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(adminUser.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(adminUser.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(payload.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(adminUser.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', adminUser.role);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });

                        test("update user invalid username", async () => {
                                let usernameB = "superte@sterB";

                                let payload = {
                                        username: usernameB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });


                        test("update user email", async () => {
                                let emailB = "testerb@test.com";

                                let payload = {
                                        email: emailB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(adminUser.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(adminUser.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(adminUser.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(payload.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', adminUser.role);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });

                        test("update user invalid email", async () => {
                                let emailB = "testerb test.com";

                                let payload = {
                                        email: emailB
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));

                        });

                        test("update user role", async () => {

                                let payload = {
                                        role: ROLE.BASIC
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let responseUser = response.body;
                                expect(responseUser).toBeInstanceOf(Object);
                                expect(responseUser).toHaveProperty('name', depurator.depurateName(adminUser.name));
                                expect(responseUser).toHaveProperty('surname', depurator.depurateSurname(adminUser.surname));
                                expect(responseUser).toHaveProperty('username', depurator.depurateUsername(adminUser.username));
                                expect(responseUser).toHaveProperty('email', depurator.depurateEmail(adminUser.email));
                                expect(responseUser).not.toHaveProperty('password');
                                expect(responseUser).toHaveProperty('role', ROLE.BASIC);
                                expect(responseUser).toHaveProperty('_id', adminUser._id.toString());
                                expect(responseUser).toHaveProperty('updatedAt');
                                expect(responseUser).toHaveProperty('createdAt');

                        });

                        test("update user invalid role", async () => {

                                let payload = {
                                        role: "blue"
                                }

                                const response = await request(app)
                                        .patch(`/api/users/${adminUser._id}`)
                                        .set('Authorization', adminToken)
                                        .send(payload);

                                let body = response.body;
                                expect(body).toEqual(errors.errorFound(""));
                        });
                });
        });
});