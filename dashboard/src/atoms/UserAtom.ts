import { atom, selector } from "recoil";
import { IApplicant, IUser, StaffRoleEnum } from "types/Applicant.types";
import { ApplicantsAtom } from "./ApplicantsAtom";
import { CampaignAtom } from "./CampaignAtom";

export const UserAtom = atom({
	key: "UserAtom",
	default: null as unknown as Partial<IUser>,
});

export const UsersAtom = atom({
	key: "UsersAtom",
	default: [] as IUser[],
});

export const SelectedUserAtom = atom({
	key: "SelectedUserAtom",
	default: null as unknown as Partial<IUser>,
});

export const MyApplicantsAtom = atom({
	key: "my-applicants",
	default: [] as IApplicant[],
});

export const UserCountAtom = selector({
	key: "UsersByRole",
	get: ({ get }) => {
		const reps = get(UsersAtom).filter(
			(user) => user.role === StaffRoleEnum.Rep,
		);
		const lawyers = get(UsersAtom).filter(
			(user) => user.role === StaffRoleEnum.Lawyer || StaffRoleEnum.LegalWorld,
		);
		return {
			reps,
			lawyers,
		};
	},
});

export const CountAllSelector = selector({
	key: "countAll",
	get: ({ get }) => {
		const user = get(UserAtom);
		const users = get(UsersAtom);
		let applicants = get<IApplicant[]>(ApplicantsAtom);
		const myApplicants = get(MyApplicantsAtom);
		const lawyers = users.filter((user) => user.role === StaffRoleEnum.Lawyer);
		const campaigns = get(CampaignAtom).length;
		if (user?.role === StaffRoleEnum.Draft)
			applicants = applicants?.filter((app) => app.amount_paid > 0);

		return {
			applicants:
				user?.role === StaffRoleEnum.Admin
					? applicants.length
					: user?.role === StaffRoleEnum.Draft
					? applicants.length
					: myApplicants.length,
			users: users?.length,
			lawyers: lawyers?.length,
			campaigns,
		};
	},
});
