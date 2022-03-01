import dayjs from "dayjs";
import LocalizedFormate from "dayjs/plugin/localizedFormat";
// import merge from "easy-pdf-merge";
import fs from "fs-extra";
import hbs from "handlebars";
import Moment from "moment";
import path from "path";
import puppeteer from "puppeteer";
import slugify from "slugify";

dayjs.extend(LocalizedFormate);
const rootDir = path.dirname(require.main.path);
// const merger = new PDFMerger();
// console.log("from createPDF:", rootDir);
const uploadDir = (data) => {
  const fileName = slugify(data.name, { lower: true });
  const file = `merged-${fileName}-${Date.now().toString()}.pdf`;

  return file;
};

export const createPdf = async (templateName, data) => {
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
    let fileName = slugify(data.name, { lower: true });
    fileName = `${fileName}-${Date.now().toString()}.pdf`;
    await page.setContent(content);
    await page.emulateMediaType("screen");

    // const output = `public/${fileName}-${Date.now().toString()}.pdf`;
    const output = `public/${fileName}-${Date.now().toString()}.pdf`;
    // const output =  fs.outputFile(file,)

    try {
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
      return fileName;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const DraftB = async (data, affidavit) => {
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

  try {
    const result = {
      notice: noticePath,
      affidavit: aff,
      address,
      statement,
    };

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DraftC = async (applicant, affidavit) => {
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

  // const filePath = uploadDir(applicant);

  try {
    const result = {
      notice: noticePath,
      affidavit: aff,
      address,
      statement: "",
    };

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error(error);
  }
};

export const DraftD = async (applicant, affidavit) => {
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

  try {
    const result = {
      notice: noticePath,
      affidavit: aff,
      address,
      statement,
    };

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const handlePDF = async (applicant, affidavit) => {
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
