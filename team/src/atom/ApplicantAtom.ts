import { atom, selector, selectorFamily } from "recoil";

export const ApplicantsAtom = atom({
  key: "applicantsAtom",
  default: [],
});

export const UserApplicant = selectorFamily({
  key: "applicantsSelector",
  get: (_id) => ({ get }) => {
    const applicants = get(ApplicantsAtom);
    const filtered = [...applicants].filter(
      (applicant) => applicant.rep?._id === _id || applicant.lawyer?._id === _id
    );

    return filtered;
  },
});
