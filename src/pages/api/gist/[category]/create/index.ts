import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin!);
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  const [,,,category] = req.url!.split('/');
  const { contents } = req.body;

  const item = {
    id: generateUUID(),
    body: contents,
  };

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    return res.status(400).json({ error: `There is no category of ${category}` });
  }

  try {
    const data = await client.createItem({
      listId: BOX_CATEGORY[category as keyof typeof BOX_CATEGORY],
      item,
    });
  
    return res.status(200).json({ data });
  } catch (error: any) {
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
