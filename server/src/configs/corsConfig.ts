import { CorsOptions } from "cors";

const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:3002",
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // Frontend production
  "http://localhost:3001", // Server port
];

// Permite domínios do Vercel (qualquer subdomínio .vercel.app)
const isVercelDomain = (origin: string | undefined): boolean => {
  if (!origin) return false;
  return origin.includes(".vercel.app");
};

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex: Postman, mobile apps)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Permite origens na lista
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    // Permite domínios do Vercel
    if (isVercelDomain(origin)) {
      callback(null, true);
      return;
    }

    // Permite se CORS_ORIGIN for "*" (qualquer origem)
    if (process.env.CORS_ORIGIN === "*") {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"], // GET e POST (para queries)
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
