const Depurator = require('../src/depurator');

describe("Depurate name", () => {

        test("no changes", () => {
                const name = "asdfg";
                const expected = "asdfg";

                const result = Depurator.depurateName(name);
                expect(result).toBe(expected);
        });


        test("trim", () => {
                const name = " asdfg  ";
                const expected = "asdfg";

                const result = Depurator.depurateName(name);
                expect(result).toBe(expected);
        });

        test("to lower case", () => {
                const name = "aSDfg";
                const expected = "asdfg";

                const result = Depurator.depurateName(name);
                expect(result).toBe(expected);
        });

        test("trim and lower case", () => {
                const name = " asDFg ";
                const expected = "asdfg";

                const result = Depurator.depurateName(name);
                expect(result).toBe(expected);
        });
});

describe("Depurate surname", () => {
        test("no changes", () => {
                const surname = "asdfg";
                const expected = "asdfg";

                const result = Depurator.depurateSurname(surname);
                expect(result).toBe(expected);
        });


        test("trim", () => {
                const surname = " asdfg  ";
                const expected = "asdfg";

                const result = Depurator.depurateSurname(surname);
                expect(result).toBe(expected);
        });

        test("to lower case", () => {
                const surname = "aSDfg";
                const expected = "asdfg";

                const result = Depurator.depurateSurname(surname);
                expect(result).toBe(expected);
        });

        test("trim and lower case", () => {
                const surname = " asDFg ";
                const expected = "asdfg";

                const result = Depurator.depurateSurname(surname);
                expect(result).toBe(expected);
        });
});

describe("Depurate username", () => {
        test("no changes", () => {
                const username = "asdfg";
                const expected = "asdfg";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });


        test("trim", () => {
                const username = " asdfg  ";
                const expected = "asdfg";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });

        test("to lower case", () => {
                const username = "aSDfg";
                const expected = "asdfg";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });

        test("trim and lower case", () => {
                const username = " asDFg ";
                const expected = "asdfg";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });
});


describe("Depurate email", () => {
        test("no changes", () => {
                const username = "aaaa@bbbb.cccc";
                const expected = "aaaa@bbbb.cccc";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });


        test("trim", () => {
                const username = " aaaa@bbbb.cccc  ";
                const expected = "aaaa@bbbb.cccc";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });

        test("to lower case", () => {
                const username = "aAAa@bbbb.cccc";
                const expected = "aaaa@bbbb.cccc";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });

        test("trim and lower case", () => {
                const username = " aaaa@bBBb.cccc ";
                const expected = "aaaa@bbbb.cccc";

                const result = Depurator.depurateUsername(username);
                expect(result).toBe(expected);
        });
});