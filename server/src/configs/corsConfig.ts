import { CorsOptions } from "cors";

const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:3002",
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // Frontend production
  "http://localhost:3001", // Server port
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET"], // Apenas SELECTs
  allowedHeaders: ["Content-Type", "Authorization"],
};
