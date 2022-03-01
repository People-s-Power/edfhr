import dayjs from "dayjs";
import LocalizedFormate from "dayjs/plugin/localizedFormat";
import merge from "easy-pdf-merge";
import fs from "fs-extra";
import hbs from "handlebars";
import Moment from "moment";
import path from "path";
import puppeteer from "puppeteer";
import slugify from "slugify";
dayjs.extend(LocalizedFormate);
// const merger = new PDFMerger();

const uploadDir = (data): string => {
  const fileName = slugify(data.name, { lower: true });
  const file = `merged-${fileName}-${Date.now().toString()}.pdf`;

  return file;
};

export const createPdf = async (
  templateName: string,
  data
): Promise<string> => {
  const compile = async () => {
    const filePath = path.join(__dirname, `templates/${templateName}.hbs`);

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

    // const output = `public/${fileName}-${Date.now().toString()}.pdf`;
    const output = path.resolve(
      process.env.NODE_ENV === "production" ? "assets" : "src/assets",
      `${fileName}-${Date.now().toString()}.pdf`
    );
    // const output =  fs.outputFile(file,)

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
    throw new Error(error);
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

  const filePath = uploadDir(applicant);
  try {
    await merge(
      [noticePath, address, statement, aff],
      path.join(__dirname, "assets/", filePath),
      (err) => {
        if (err) return console.log(err);
      }
    );
    return filePath;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
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

  const filePath = uploadDir(applicant);

  try {
    await merge(
      [noticePath, address, aff],
      path.join(__dirname, "assets/", filePath),
      (err) => {
        if (err) return console.log(err);
      }
    );
    return filePath;
  } catch (error) {
    console.log(error);
    throw error(error);
  }
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

  const filePath = uploadDir(applicant);

  try {
    await merge(
      [noticePath, address, statement, aff],
      path.join(__dirname, "assets/", filePath),
      (err) => {
        if (err) return console.log(err);
      }
    );
    return filePath;
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
