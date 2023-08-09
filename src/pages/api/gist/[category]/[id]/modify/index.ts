import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../../constants';
import { client } from '../../../client';

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
  const [,,,category,id] = req.url!.split('/');
  const { contents } = await req.body;

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    return res.status(400).json({ error: `There is no category of ${category}` });
  }

  try {
    const data = await client.updateItem({
      listId: BOX_CATEGORY[category as keyof typeof BOX_CATEGORY],
      itemId: id,
      item: {
        id,
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
