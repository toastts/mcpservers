import * as fs from "fs";
import * as path from "path";
import { db } from "../lib/db";
import { servers } from "../drizzle/schema";

async function populateServers() {
  const jsonPath = path.join(__dirname, "..", "mcpservers.json");
  const jsonData = fs.readFileSync(jsonPath, "utf8");
  const serverData = JSON.parse(jsonData);

  for (const server of serverData) {
    try {
      await db.insert(servers).values({
        name: server.name,
        description: server.description,
        githubUrl: server.githubUrl,
      });
      console.log(`Inserted: ${server.name}`);
    } catch (err) {
      console.error(`Error inserting ${server.name}:`, err);
    }
  }
}

populateServers()
  .then(() => {
    console.log("Finished populating servers.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error populating servers:", err);
    process.exit(1);
  });
