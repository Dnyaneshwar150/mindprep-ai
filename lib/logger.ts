import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info", // or "info" if you want to reduce verbosity
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(), // ✅ works both locally and on Vercel
  ],
});
