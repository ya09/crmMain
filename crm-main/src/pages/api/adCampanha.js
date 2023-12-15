import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function postTag(req, res) {

  if (req.method === "POST") {
    const response = req.body;
    try {
      const novaTag= await prisma.campanha.create({
        data: {
          nome: response.nome,
          unidade: response.unidade,
          dataInicio: response.dataInicio,
          dataFinal: response.dataFinal,
          data: response.data,
          situacao: response.situacao,
          descricao: response.descricao,
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