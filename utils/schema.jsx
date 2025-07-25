const { integer, pgTable, varchar, serial, text } = require("drizzle-orm/pg-core");

export const userInfo = pgTable('userInfo', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  username: varchar('username'),
  bio: text("bio"),
  location:varchar('location'),
  link:varchar('link')
  
});
