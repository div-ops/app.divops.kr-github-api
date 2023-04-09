import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const cachePrefix = "/tmp/cache";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.key) {
    res.status(200).json({
      data: fs.readFileSync(`${cachePrefix}/${req.query.key}.json`, "utf8"),
    });
  } else {
    res.status(400).json({ error: `Bad request (${req.query.key})` });
  }
}
