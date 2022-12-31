import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { API } from "@divops/github-oauth";

export default API.of({ name: "app-divops-kr" }).SetCookie({
  before: async (req, res) => {
    await NextCors(req as NextApiRequest, res as NextApiResponse, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: ["https://www.creco.services", "http://localhost:3000"],
      optionsSuccessStatus: 200,
    });
  },
});
