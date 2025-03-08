import {
  pgTable,
  text,
  varchar,
  uuid,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  //NOTE: username is optional for now
  username: varchar("username", { length: 100 }),
});

// servers table: represent the MCP's
export const servers = pgTable("servers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  githubUrl: varchar("github_url", { length: 512 }),
});

// tags table: categorizing or labeling servers, many servers to many tags
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// junction table, many-to-many relation between servers and tags
export const serversToTags = pgTable(
  "servers_to_tags",
  {
    serverId: uuid("server_id").references(() => servers.id),
    tagId: uuid("tag_id").references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey(table.serverId, table.tagId),
  }),
);

// votes table: tracking upvotes/downvotes for servers
export const votes = pgTable("votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  serverId: uuid("server_id").references(() => servers.id),
  value: integer("value").notNull(), // +1 for upvote, -1 for downvote
});
