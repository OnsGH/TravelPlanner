import { getNumberOfDays } from "../src/client/js/app";
import { isEmptyInput } from "../src/client/js/diplayData";
import "@testing-library/jest-dom";
describe("Validate is Empty input function", () => {
    test("It should return either true or false depending on the input entered ", () => {
        const inputElement = document.createElement("input");
        document.body.innerHTML = '<span id="msg"> </span/>';

        inputElement.value = "Paris";
        expect(isEmptyInput(inputElement)).toBeFalsy();

        const invalidInputElement = document.createElement("input");
        invalidInputElement.value = "";
        expect(isEmptyInput(invalidInputElement.value)).toBeTruthy();
    });
});
/* Test result depends od the system Date */
test("check that the difference between System Date and the input date is correct", () => {
    expect(getNumberOfDays("2021-3-15")).toBe(2);
});
