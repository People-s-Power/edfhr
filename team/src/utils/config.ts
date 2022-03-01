export default {
  MONGO_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : "mongodb://localhost/edfhr_dashboard",
  SECRET: process.env.SECRET || "kjdnsdlkdslkm",
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  PAYSTACK_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.PAYSTACK_SECRET
      : "sk_test_67f75eb75b614b51c244e2bfe4da1bb570d4ab6c",
  //Test
  PAYSTACK_PUBLIC:
    process.env.PAYSTACK_PUBLIC ||
    "pk_test_d3a31b2cdc5f6e30b4e5be18af961f9948084ed4", //TEST
  SERVER_URL:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_URL
      : "http://localhost:8000",
  CLIENT_URL:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:3000",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_ENV: process.env.CLOUDINARY_API_ENV,
};
