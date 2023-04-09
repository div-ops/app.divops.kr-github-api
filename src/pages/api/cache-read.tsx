import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

type Cache = {
  [key: string]: any;
};

const cacheFilePath = __dirname + "/../cache.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(cacheFilePath)) {
    fs.writeFileSync(cacheFilePath, "{}", "utf-8");
  }

  if (req.method === "GET" && req.query.key) {
    const key = req.query.key as string;
    const cacheFileData = fs.readFileSync(cacheFilePath, "utf8");
    const cache: Cache = JSON.parse(cacheFileData);
    const result = cache[key];

    if (result !== undefined) {
      res.status(200).json({ data: result });
    } else {
      res.status(404).json({ error: "Key not found" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
