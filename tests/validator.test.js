const Validator = require('../src/validator')


describe("Validator validate id", () => {

        test("valid id", () => {
                const testCaseId = "6204454c93f1447f2f28e674";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(false);
        });

        test("invalid char on id", () => {
                const testCaseId = "[6204454c93f1447f2f28e674";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on id", () => {
                const testCaseId = "6204454 c93f1447f2f28e674";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on if at the beginning", () => {
                const testCaseId = " 6204454c93f1447f2f28e674";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on id at the end", () => {
                const testCaseId = "6204454c93f1447f2f28e674 ";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });

        test("empty id", () => {
                const testCaseId = "";
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });

        test("null id", () => {
                const testCaseId = null;
                const result = Validator.isValidId(testCaseId);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidId(testCaseId);
                expect(negateResult).toBe(true);
        });
});


describe("Validator validate name", () => {

        test("valid name", () => {
                const testCaseName = "asdf";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(false);
        });

        test("invalid char on name", () => {
                const testCaseName = "[asdf";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on name", () => {
                const testCaseName = "as df";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on name at the beginning", () => {
                const testCaseName = " asdf";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on name at the end", () => {
                const testCaseName = "asdf ";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });

        test("empty name", () => {
                const testCaseName = "";
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });

        test("null name", () => {
                const testCaseName = null;
                const result = Validator.isValidName(testCaseName);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidName(testCaseName);
                expect(negateResult).toBe(true);
        });
});

describe("Validator validate surname", () => {
        test("valid surname", () => {
                const testCaseSurname = "asdf";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(false);
        });

        test("invalid char on surname", () => {
                const testCaseSurname = "[asdf";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on surname", () => {
                const testCaseSurname = "as df";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on surname at the beginning", () => {
                const testCaseSurname = " asdf";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on surname at the end", () => {
                const testCaseSurname = "asdf ";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });

        test("empty surname", () => {
                const testCaseSurname = "";
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });

        test("null surname", () => {
                const testCaseSurname = null;
                const result = Validator.isValidSurname(testCaseSurname);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidSurname(testCaseSurname);
                expect(negateResult).toBe(true);
        });
});

describe("Validator validate password", () => {
        test("valid password", () => {
                const testCasePassword =  "asd2fQWE3%&/.qwer";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(false);
        });

        test("invalid password less than 8 chars", () => {
                const testCasePassword =  "&Aa1dfr";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });

        test("invalid password only lowercase", () => {
                const testCasePassword =  "asdfghjkasdfgh";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });

        test("invalid password only letters", () => {
                const testCasePassword =  "asdfghQWERTYfgh";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });

        test("invalid password only numbers", () => {
                const testCasePassword =  "1234567890987";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });

        test("invalid password without special chars", () => {
                const testCasePassword =  "aaaQQQ111";
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });

        test("null password", () => {
                const testCasePassword =  null;
                const result = Validator.isValidPassword(testCasePassword);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidPassword(testCasePassword);
                expect(negateResult).toBe(true);
        });
});

describe("Validator validate email", () => {

        test("valid email", ()=>{
                const testCaseEmail =  "username123@mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(false);
        });

        test("valid email with point", ()=>{
                const testCaseEmail =  "username.surname@mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(false);
        });

        test("valid email with underscore", ()=>{
                const testCaseEmail =  "username_surname@mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(false);
        });

        test("missing @", ()=>{
                const testCaseEmail =  "usernamemailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("invalid char on domain", ()=>{
                const testCaseEmail =  "username@mailserver.d&omain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing dot on domain", ()=>{
                const testCaseEmail =  "username@mailserverdomain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);


                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("email with a dot but missing dot on domain", ()=>{
                const testCaseEmail =  "username.surname@mailserverdomain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing domain but it has a dot", () => {
                const testCaseEmail =  "username@mailserver.";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing domain but it does not have a dot", () => {
                const testCaseEmail =  "username@mailserver";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing email username", () => {
                const testCaseEmail =  "@mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing email username white space", () => {
                const testCaseEmail =  " @mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("invalid email username char", () => {
                const testCaseEmail =  "user<name@mailserver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("missing mail server", () => {
                const testCaseEmail =  "username@.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("mail server invalid char", () => {
                const testCaseEmail =  "username@mailser/ver.domain";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });


        test("empty email", () => {
                const testCaseEmail =  "";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("only white spaces email", () => {
                const testCaseEmail =  " ";
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });

        test("null email", () => {
                const testCaseEmail =  null;
                const result = Validator.isValidEmail(testCaseEmail);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidEmail(testCaseEmail);
                expect(negateResult).toBe(true);
        });
});

describe("Validator validate username", () => {
        test("valid username", () => {
                const testCaseUsername = "asdfghjk";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(true);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(false);
        });

        test("invalid char on username", () => {
                const testCaseUsername = "[asdf";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on username", () => {
                const testCaseUsername = "as df";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on username ath the beginning", () => {
                const testCaseUsername = " asdf";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("invalid empty space on username ath the end", () => {
                const testCaseUsername = "asdf ";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("empty username", () => {
                const testCaseUsername = "";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("invalid username length lower than 8 char", () => {
                const testCaseUsername = "asdf";
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });

        test("null username", () => {
                const testCaseUsername = null;
                const result = Validator.isValidUsername(testCaseUsername);
                expect(result).toBe(false);

                const negateResult = Validator.isNotValidUsername(testCaseUsername);
                expect(negateResult).toBe(true);
        });
});