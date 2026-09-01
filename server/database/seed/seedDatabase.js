import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/database/
const databaseDir = path.resolve(__dirname, "..");

// server/database/aurelia.db
const databasePath = path.join(databaseDir, "aurelia.db");

// server/database/seed/schema.sql
const schemaPath = path.join(__dirname, "schema.sql");

async function seed() {
  // Ensure the database folder exists
  await fs.mkdir(databaseDir, { recursive: true });

  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  const sql = await fs.readFile(schemaPath, "utf8");

  await db.exec(sql);

  console.log("✅ Database seeded successfully.");
  console.log(`Database: ${databasePath}`);

  await db.close();
}

seed().catch((error) => {
  console.error("❌ Seeding failed:");
  console.error(error);
});
