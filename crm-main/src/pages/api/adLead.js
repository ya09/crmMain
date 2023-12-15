import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function postTable(req, res) {

  if (req.method === "POST") {
    const response = req.body;
    try {
      const novoContrato = await prisma.ad.create({
        data: {
          nomeLead : response.nomeLead,
          cpf_cnpj : response.cpf,
          sobre: response.sobre,
          nome: response.nome,
          telefone: response.telefone,
          email: response.email,
          origem: response.origem,
          campanha: response.campanha,
          situacao: response.situacao,
          unidade: response.unidade,
          progresso: response.progresso,
          titulo: response.titulo,
          responsavel: response.responsavel,
          data: response.data,
          dataAtualizacao: response.dataAtualizacao
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