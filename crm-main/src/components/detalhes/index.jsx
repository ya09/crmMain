'use client'
import { Button, Card, Col, Form } from "react-bootstrap"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router"; 
import styles from './Detalhe.module.css'



export default function Detalhe(params){

    const router = useRouter()
    const { user } = router.query

    const pegarDataAtual = () => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 pois os meses em JavaScript são baseados em zero
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        
        const dataFormatada = `${dia}-${mes}-${ano}`;
        return dataFormatada;
      };
      const dataAtual = pegarDataAtual();

    const [response, setResponse] = useState(null);

    async function buscaDados (){

        const user = window.location.href.split('user?user=')[1]

       const dados =  await fetch ('api/getId', {
            method: 'POST', 
            body: JSON.stringify ({user}),
            headers:{'Content-Type': 'application/json'}
        })
        const data = await dados.json()
        setResponse(data[0]);

    }
    const [tags, setTags] = useState([]);
    useEffect (() =>{ 
            buscaDados();

            async function fetchUsers(){
                try {
                    const response = await fetch('/api/getTag');
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    const resp = await response.json();
                    
                    setTags(resp);
                  } catch (error) { 
                    console.error(error);
                  }
            }
        fetchUsers();
    }, [])


    const [progresso, setProgresso] = useState('')
    const id = parseInt(user)

    async function Enviar(){
       
        const res = await fetch ('/api/update', {
            method: 'POST',
            body: JSON.stringify ({progresso, id, dataAtual}),
            headers:{'Content-Type': 'application/json'}
        })
        window.location.reload();
    }
    
    return(
        <Col  sm={10} className="offset-sm-2">
        <div>
            <div className= {styles.fundo}>
                <div className= {styles.box}>
                    <h3 className= {styles.titulo}>Visualizando Lead</h3>
                </div>
            </div>
            <div className= {styles.tela}>
                <Card className= {styles.card}>
                    <div className= {styles.cont}>
                        <h3 > <strong></strong> {response?response.nomeLead:''} / {response?response.situacao:''}</h3>
                        <div> <strong> Data de criação:</strong>  {response?response.data:''}</div>
                        <div> <strong> Unidade:</strong>  {response?response.unidade:''}</div> 
                        <div> <strong> Origem:</strong>  {response?response.origem:''}</div>
                        <div> <strong> Campanha:</strong>  {response?response.campanha:''}</div>
                        <div> <strong> Responsável:</strong>  {response?response.responsavel:''}</div>
                        <div> <strong> CPF/CNPJ:</strong>  {response?response.cpf_cnpj:''}</div>
                        <div> <strong> Informações:</strong>  {response?response.progresso:''}</div>

                    </div>
                </Card>
                <Card className= {styles.card}>
                    <div className= {styles.cont}>
                        <h3> <strong>Contatos</strong> </h3>
                        <div> <strong> Nome:</strong>  {response?response.nome:''}</div>
                        <div> <strong> Telefone:</strong>  {response?response.telefone:''}</div>

                    </div>
                </Card>
                <Card className= {styles.card}>
                    <div className= {styles.cont}>
                        <h3> <strong>Atualizar Tags</strong> </h3>
                        <Form>
                            <Form.Select onChange={(e) => setProgresso(e.target.value)} >
                                <option>{response?response.progresso:''}</option>
                                {tags.map((resp) => (
                                <option key={resp.id} value={resp.nome}>
                                    {resp.nome}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form>
                        <Button onClick={Enviar} className= {styles.botao}>Atualizar</Button>
                    </div>
                </Card>            
            </div>           
        </div>
        </Col>
    ) 
}