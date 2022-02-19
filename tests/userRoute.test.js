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
                        test("list 3 users", async () => {
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

                        test("list 3 users", async () => {
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
                                console.log(response);
                                expect(body).toEqual({ message: 'we found an error' });
                        });
                });
        });
});