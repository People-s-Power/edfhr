import { atom } from "recoil";
import { ICampaign } from "types/Applicant.types";

export const CampaignAtom = atom({
  key: "campaign-atom",
  default: [] as unknown as ICampaign[],
});
