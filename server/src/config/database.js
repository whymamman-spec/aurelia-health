import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPath = path.resolve("database", "aurelia.db");

export async function connectDatabase() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
