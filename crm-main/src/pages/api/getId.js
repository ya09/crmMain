import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getID (req,res){

    if(req.method === 'POST'){
        try{
                const user = await prisma.$queryRaw `
                SELECT *
                FROM ad
                WHERE id = ${req.body.user}
                `;
                if (user) {
                    return res.status(200).json(user);
                  } else {
                    return res.status(404).json({ error: 'User not found' });
                  }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching users' });
        }
    }
    else { 
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
