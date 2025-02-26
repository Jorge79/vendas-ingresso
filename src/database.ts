import * as mysql from "mysql2/promise";

export class Database {
  private static instance: mysql.Pool;
  private constructor() {}
  public static getInstance(): mysql.Pool {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return Database.instance;
  }
}
