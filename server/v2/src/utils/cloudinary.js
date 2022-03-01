/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import * as Cloudinary from "cloudinary";
import config from "./config";

export const cloudinary = Cloudinary.v2;

const options = {
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
};

cloudinary.config(options);

export const cloudinaryUpload = async (image) => {
  try {
    const res = await cloudinary.uploader.upload(image, {
      fetch_format: "auto",
      crop: "scale",
      quality: "auto",
    });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const uploadPDF = async (pdf) => {
  try {
    const res = await cloudinary.uploader.upload(pdf, {
      format: "pdf",
      fetch_format: "auto",
      crop: "scale",
      quality: "auto",
      transformation: {
        width: 800,
        crop: "scale",
        gravity: "auto",
      },
    });

    return res.url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
