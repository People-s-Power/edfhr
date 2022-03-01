module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: `/api/strapi`,
  admin: {
    // url: process.env.STRAPI_URL+`/api/dashboard`,
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});
