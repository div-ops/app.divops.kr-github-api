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

  if (req.method === "GET") {
    const cacheFileData = fs.readFileSync(cacheFilePath, "utf8");
    const cache: Cache = JSON.parse(cacheFileData);

    if (cache != null) {
      res.status(200).json({ data: cache });
    } else {
      res.status(404).json({ error: "cache not found" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
