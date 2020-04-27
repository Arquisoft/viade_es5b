import "@testing-library/jest-dom";
import { addFriend } from "../../../BackEnd/Scripts/addFriend";
import { auth } from "../__mocks__/solid-auth-client";
jest.mock('solid-auth-client');


test("Añade un amigo correctamente", async () => {
  return expect(addFriend("https://pedro223.inrupt.net/profile/card#me")).toBe(true);
});



