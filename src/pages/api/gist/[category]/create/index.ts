import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';
import { requireAuth } from "../../health";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.headers.origin != null) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin!);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // specific logic for the preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  };

  const [,,,category] = req.url!.split('/');
  const { contents } = req.body;

  const item = {
    id: generateUUID(),
    body: contents,
  };
  let listId;

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    listId = category;
  } else {
    listId = BOX_CATEGORY[category as keyof typeof BOX_CATEGORY];
  }

  try {
    requireAuth(req);

    const data = await client.createItem({
      listId,
      item,
    });
  
    return res.status(200).json({ data });
  } catch (error: any) {
    if (error.code != null) {
      return res.status(error.code).json({ message: error.message });
    }

    if (error.message.includes('찾을 수 없습니다.')) {
      return res.status(404).json({ message: error.message, item });
    }

    console.error(error.message);
    return res.status(500).json({ message: error.message, item });
  }
}

function generateUUID() {
  let d = new Date().getTime();
  if (typeof process !== 'undefined' && typeof process.hrtime === 'function') {
    d += process.hrtime()[1] / 1000000; // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
