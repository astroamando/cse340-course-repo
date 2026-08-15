import "dotenv/config";
import bcrypt from "bcrypt";
import db from "./models/db.js";

const setupUsers = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user'
      );
    `);

    const hashedPassword = await bcrypt.hash("cse340!", 10);

    await db.query(
      `
        INSERT INTO users (
          first_name,
          last_name,
          email,
          password,
          role
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email)
        DO UPDATE SET
          password = EXCLUDED.password,
          role = EXCLUDED.role;
      `,
      [
        "Admin",
        "User",
        "admin@example.com",
        hashedPassword,
        "admin",
      ]
    );

    console.log("Users table ready.");
    console.log("Admin account ready: admin@example.com");
    process.exit(0);
  } catch (error) {
    console.error("User setup failed:", error);
    process.exit(1);
  }
};

setupUsers();