import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const [,,,category] = (new URL(req.url!)).pathname.split('/');
  const { contents } = await req.body;

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    return res.status(400).json({ error: `There is no category of ${category}` });
  }

  try {
    const data = await client.createItem({
      listId: BOX_CATEGORY[category as keyof typeof BOX_CATEGORY],
      item: {
        id: generateUUID(),
        body: contents,
      }
    });
  
    return res.status(200).json({ data });
  } catch (error: any) {
    if (error.message.includes('찾을 수 없습니다.')) {
      return res.status(404).json({ message: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ message: error.message });
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
