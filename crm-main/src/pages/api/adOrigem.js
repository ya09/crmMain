import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function postTag(req, res) {

  if (req.method === "POST") {
    const response = req.body;
    try {
      const novaTag= await prisma.origem.create({
        data: {
          nome: response.nome,
          responsavel: response.responsavel,
          data: response.data,
          situacao: response.situacao,
        },
      });
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({ message: "Erro ao cadastrar usuário" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}