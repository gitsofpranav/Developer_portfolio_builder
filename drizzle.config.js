/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.jsx", // make sure it's .js or .ts
  out: "./drizzle",            // optional but recommended
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_q1gB8NMvlYwQ@ep-aged-dawn-a8lq73y3-pooler.eastus2.azure.neon.tech/developer-portfolio?sslmode=require&channel_binding=require',
  },
};
