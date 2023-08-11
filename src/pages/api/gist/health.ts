import { ensureEnv } from "@divops-packages/node-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { pbkdf2Sync } from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const [token, id] = req.cookies['Authorization']?.split(':') ?? [];

  const secretKey = ensureEnv('GIST_STORAGE_TOKEN') + `:${id}`;
  console.log({ token, id });

  // 암호화된 문자열
  const cryptedToken = pbkdf2Sync(`${id}:${new Date().toISOString().slice(0,7)}`, secretKey, 1000, 64, 'sha512').toString('base64');

  console.log('cryptedToken', cryptedToken.slice(0, 10));
  // 암호화된 문자열이 secret 으로 암호화되었는지 확인
  if (token === cryptedToken) {
    res.status(400).json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Error' });
  }
}
