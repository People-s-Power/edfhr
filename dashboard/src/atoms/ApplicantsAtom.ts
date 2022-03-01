import { atom, selector } from "recoil";
import { IApplicant, StaffRoleEnum } from "types/Applicant.types";
import { MyApplicantsAtom, UserAtom } from "./UserAtom";

export const ApplicantsAtom = atom({
  key: "ApplicantsAtom",
  default: [],
});

export const ApplicantAtom = atom({
  key: "ApplicantAtom",
  default: null as unknown as Partial<IApplicant>,
});

export const ApplicantsSelector = selector({
  key: "applicantsSelector",
  get: ({ get }) => {
    const user = get(UserAtom);
    const applicants = get<IApplicant[]>(ApplicantsAtom);
    const myApplicants = get(MyApplicantsAtom);

    if (user?.role === StaffRoleEnum.Admin || user?.role === StaffRoleEnum.Suppervisor) return applicants;
    else if (user?.role === StaffRoleEnum.LegalWorld) return applicants;
    else if (user?.role === StaffRoleEnum.Draft) return applicants.filter((app) => app?.amount_paid > 0);
    else return myApplicants;
  },
});
