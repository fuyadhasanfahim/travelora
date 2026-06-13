import { customAlphabet } from "nanoid";

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const id = customAlphabet(alphabet, 8);

export const ref = {
  booking: () => `BK-${id()}`,
  payment: () => `PM-${id()}`,
};
