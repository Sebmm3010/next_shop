import { db, seedData } from '@/data';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { msg: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV==='production'){
        return res.status(401).json({msg:'No tiene acceso a este API'})
    }

    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(seedData.initialData.products);
    await db.disconnect();

    res.status(200).json({ msg: 'Proceso realizado correcatamente' });
}