import fs from "fs/promises";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function seed() {
  const db = await open({
    filename: path.resolve("database", "aurelia.db"),
    driver: sqlite3.Database,
  });

  const sql = await fs.readFile(
    path.resolve("database", "seed", "schema.sql"),
    "utf-8",
  );

  await db.exec(sql);

  console.log("✅ Database seeded successfully.");

  await db.close();
}

seed().catch((error) => {
  console.error("❌ Seeding failed:");
  console.error(error);
});
