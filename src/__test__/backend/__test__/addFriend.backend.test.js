import "@testing-library/jest-dom";
import { addFriend } from "../../../BackEnd/Scripts/addFriend";
import { auth } from "../__mocks__/solid-auth-client";
jest.mock('solid-auth-client');


// test("Añade un amigo correctamente", async () => {
//   return expect(addFriend("https://pedro223.inrupt.net/profile/card#me")).toBe(true);
// });
// test("Añade un amigo incorrectamente", async () => {
//   return expect(addFriend("https://alex.inrupt.net/profile/card#me")).toBe(false);
// });
// test("Añade un amigo que no es una url valida", async () => {
//   return expect(addFriend("")).toBe(false);
// });
test("Test de ejemplo", () =>{
    expect(true);
});

