import { atom } from "recoil";

export const UserAtom = atom({
  key: "userAtom",
  default: null,
});

export const UsersAtom = atom({
  key: "usersAtomList",
  default: [],
});
