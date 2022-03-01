import dayjs from "dayjs";
import LocalizedFormate from "dayjs/plugin/localizedFormat";
import fs from "fs-extra";
import hbs from "handlebars";
import Moment from "moment";
import PDFMerger from "pdf-merger-js";
import puppeteer from "puppeteer";
import slugify from "slugify";
import merge from "easy-pdf-merge";
dayjs.extend(LocalizedFormate);
// const merger = new PDFMerger();

const uploadDir = (data) => {
  const fileName = slugify(data.name, { lower: true });
  return `merged-${fileName}-${Date.now().toString()}.pdf`;
};

export const createPdf = async (
  templateName: string,
  data
): Promise<string> => {
  const compile = async () => {
    const filePath = `public/templates/${templateName}.hbs`;

    const html = await fs.readFile(filePath, "utf-8");
    return hbs.compile(html)(data);
  };
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // console.log(data);
    const content = await compile();
    const fileName = slugify(data.name, { lower: true });
    await page.setContent(content);
    await page.emulateMediaType("screen");
    const devOutput = `public/pdfs/${fileName}-${Date.now().toString()}.pdf`;
    const prodOutput = `${fileName}-${Date.now().toString()}.pdf`;
    const output =
      process.env.NODE_ENV === "production" ? prodOutput : devOutput;

    await page.pdf({
      path: output,
      format: "A4",
      printBackground: true,
      margin: {
        bottom: 10,
        top: 10,
        right: 15,
        left: 15,
      },
    });
    // console.log(output);
    await browser.close();

    return output;
  } catch (error) {
    console.log(error);
  }
};

export const DraftB = async (data, affidavit): Promise<any> => {
  const year = new Date().getFullYear();
  const arrested_on = dayjs(data.arrested_on).format("LL");
  const applicant = {
    ...data,
    ...affidavit,
    year,
    arrested_on,
  };
  const noticePath = await createPdf("caseB/notice", {
    ...applicant,
    year,
    arrested_on,
  });
  const statement = await createPdf("caseB/statement", {
    ...applicant,
    year,
    arrested_on,
  });
  const address = await createPdf("caseB/address", {
    ...applicant,
    year,
    arrested_on,
  });

  const aff = await createPdf("caseB/affidavit", {
    ...applicant,
    year,
    arrested_on,
    affidavit,
  });
  // const fileName = slugify(applicant.name, { lower: true });
  const filePath = uploadDir(applicant);
  // const mergePDF = async () => {
  //   merger.add(noticePath.location);
  //   merger.add(address.location);
  //   merger.add(statement.location);
  //   merger.add(aff.location);
  //   return await merger.save(`public/${filePath}`);
  // };
  // await mergePDF();
  await merge(
    [noticePath, address, statement, aff],
    `public/${filePath}`,
    (err) => {
      if (err) return console.log(err);
    }
  );
  return filePath;
};

export const DraftC = async (applicant, affidavit): Promise<any> => {
  const duration = Moment.duration(Moment().diff(applicant.arrested_on));
  const months = duration.asMonths().toFixed(1);
  const year = new Date().getFullYear();
  const arrested_on = dayjs(applicant.arrested_on).format("LL");
  const arraigned_on = dayjs(applicant.arraigned_on).format("LL");

  const noticePath = await createPdf("caseC/notice", {
    ...applicant,
    year,
    arrested_on,
  });
  const address = await createPdf("caseC/address", {
    ...applicant,
    year,
    arrested_on,
    arraigned_on,
    months,
  });

  const aff = await createPdf("caseC/affidavit", {
    ...applicant,
    year,
    arrested_on,
    affidavit,
    arraigned_on,
    months,
  });
  const fileName = slugify(applicant.name, { lower: true });
  const filePath = uploadDir(applicant);
  // const mergePDF = async () => {
  //   merger.add(noticePath.location);
  //   merger.add(address.location);
  //   merger.add(aff.location);
  //   return await merger.save(`public/${filePath}`);
  // };
  // await mergePDF();
  await merge([noticePath, address, aff], `public/${filePath}`, (err) => {
    if (err) return console.log(err);
  });
  return filePath;
};

export const DraftD = async (applicant, affidavit): Promise<any> => {
  const duration = Moment.duration(Moment().diff(applicant.arrested_on));
  const months = duration.asMonths().toFixed(1);
  const year = new Date().getFullYear();
  const arrested_on = dayjs(applicant.arrested_on).format("LL");
  const arraigned_on = dayjs(applicant.arraigned_on).format("LL");

  const noticePath = await createPdf("caseD/notice", {
    ...applicant,
    year,
    arrested_on,
  });
  const address = await createPdf("caseD/address", {
    ...applicant,
    year,
    arrested_on,
    affidavit,
    arraigned_on,
    months,
  });

  const aff = await createPdf("caseD/affidavit", {
    ...applicant,
    year,
    beaten: Boolean(applicant.beaten),
    arrested_on,
    affidavit,
    arraigned_on,
    months,
  });
  const statement = await createPdf("caseD/statement", {
    ...applicant,
    year,
    arrested_on,
    arraigned_on,
    months,
  });

  const fileName = slugify(applicant.name, { lower: true });
  const filePath = uploadDir(applicant);
  // const mergePDF = async () => {
  //   merger.add(noticePath.location);
  //   merger.add(address.location);
  //   merger.add(statement.location);
  //   merger.add(aff.location);
  //   return await merger.save(`public/${filePath}`);
  // };
  // await mergePDF();
  await merge(
    [noticePath, address, statement, aff],
    `public/${filePath}`,
    (err) => {
      if (err) return console.log(err);
    }
  );
  return filePath;
};

export const handlePDF = async (applicant, affidavit): Promise<string> => {
  const { caseType } = applicant;
  switch (caseType) {
    case "B":
      return await DraftB(applicant, affidavit);
    case "C":
      return await DraftC(applicant, affidavit);
    case "D":
      return await DraftD(applicant, affidavit);
    default:
      return null;
  }
};
