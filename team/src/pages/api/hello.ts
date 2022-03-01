// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { Affidavit, Applicant } from "server/models/Applicant";
import { handlePDF } from "utils/createPdf";
import { connectDB } from "utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  await connectDB();
  const _id = req.body._id;
  let applicant = await Applicant.findById(_id);
  if (!applicant) throw new Error("Invalid aplicant _id");
  const affidavit = await Affidavit.findOne({
    applicant_id: _id,
  });
  if (!affidavit) throw new Error("Please update the affidavit");

  try {
    const draft = await handlePDF(applicant._doc, affidavit._doc);
    applicant = await Applicant.findOneAndUpdate(
      { _id },
      { draft: `/${draft}` },
      { new: true }
    );
    return res.json(applicant.draft);
  } catch (error) {
    res.json(error);
  }
};
