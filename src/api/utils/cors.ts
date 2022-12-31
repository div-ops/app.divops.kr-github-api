import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export async function createCors<RQ, RS>(req: RQ, res: RS) {
  await NextCors(req as NextApiRequest, res as NextApiResponse, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: ["https://www.creco.services", "http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  });
}
