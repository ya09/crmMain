import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const users = await prisma.$queryRaw`
    SELECT *
    FROM tag
    ORDER BY id DESC
    `;


    if(users){
      return res.status(200).json(users)
    }else{
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
