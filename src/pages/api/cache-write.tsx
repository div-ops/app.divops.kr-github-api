import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

type Cache = {
  [key: string]: any;
};

const cacheFilePath = "/tmp/cache.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(cacheFilePath)) {
    fs.writeFileSync(cacheFilePath, "{}", "utf-8");
  }

  if (req.method === "GET" && req.query.key && req.query.data) {
    const key = req.query.key as string;
    const data = req.query.data;
    const cacheFileData = fs.readFileSync(cacheFilePath, "utf8");
    const cache: Cache = JSON.parse(cacheFileData);

    cache[key] = data;
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache));

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
