import { ensureEnv } from "@divops-packages/node-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { pbkdf2Sync } from 'crypto';

class AuthError extends Error{
  code;
  constructor() {
    super('Not Allowed');
    this.code = 403;
  }
}

export function requireAuth(req: NextApiRequest) {
  const [token, id] = req.cookies['Authorization']?.split(':') ?? [];

  const secretKey = ensureEnv('GIST_STORAGE_TOKEN') + `:${id}`;

  // 암호화된 문자열
  const cryptedToken = pbkdf2Sync(`${id}:${new Date().toISOString().slice(0,7)}`, secretKey, 1000, 64, 'sha512').toString('base64url');

  // 암호화된 문자열이 secret 으로 암호화되었는지 확인
  if (token !== cryptedToken) {
    throw new AuthError();
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    requireAuth(req);

    res.status(200).json({ message: 'OK' });

  } catch (error:any) {
    if (error.code != null) {
      res.status(error.code).json({ message: error.message });
    }
  }
}
