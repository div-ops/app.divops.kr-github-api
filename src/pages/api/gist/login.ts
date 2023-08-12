import { ensureEnv } from "@divops-packages/node-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { pbkdf2Sync } from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, password } = req.body;

  try {
    if (ensureEnv('ADMIN_ID') !== id) {
      return res.status(403).json({
        message: 'ID 가 올바르지 않습니다.'
      });
    }

    if (ensureEnv('ADMIN_PASSWORD') !== password) {
      return res.status(403).json({
        message: 'PW 가 올바르지 않습니다.'
      });
    }

    const secretKey = ensureEnv('GIST_STORAGE_TOKEN') + `:${id}`;
    
    // 암호화된 문자열
    const cryptedToken = pbkdf2Sync(`${id}:${new Date().toISOString().slice(0,7)}`, secretKey, 1000, 64, 'sha512').toString('base64url');

    res.setHeader('Set-Cookie', `Authorization=${cryptedToken}:${id}; path=/; HttpOnly;`);
    res.setHeader('X-Set-Cookie-2', `Authorization=${cryptedToken}:${id}; path=/; HttpOnly;`);
    
    res.status(200).json({ message: 'ok' });
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
