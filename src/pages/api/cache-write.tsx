import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const cachePrefix = "/tmp/cache";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.key && req.query.data) {
    res.status(200).json({
      data: fs.writeFileSync(
        `${cachePrefix}/${req.query.key}.json`,
        req.query.data as string,
        "utf8"
      ),
    });
  } else {
    res.status(400).json({ error: `Bad request (${req.query.key})` });
  }
}
