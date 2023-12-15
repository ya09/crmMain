import {  Col, Form, Row, Card, Button, Table, Modal, Dropdown} from 'react-bootstrap';
import styles from '@/components/lista/Lista.module.css'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function  LeadList (){

    const router = useRouter();
    const caminho = (id) => {
        router.push(`/user?user=${id}`)
    }

    const [users, setUsers] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [campList, setCampList] = useState([]);
    const [origemList, setOrigemList] = useState([]);
    const [unidadeList, setUnidadeList] = useState([]);

    useEffect(() => {
        async function fetchUsers(){
            try {
                const response = await fetch('/api/getTable');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                setUsers(data);
              } catch (error) { 
                console.error(error);
              }
        }
        async function fetchTag(){
            try {
                const response = await fetch('/api/getTag');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const resp = await response.json();
                
                setTagList(resp);
              } catch (error) { 
                console.error(error);
              }
        }
        async function fetchCamp(){
            try {
                const response = await fetch('/api/getCampanha');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const camp = await response.json();
                
                setCampList(camp);
              } catch (error) { 
                console.error(error);
              }
        }
        async function fetchOrigem(){
            try {
                const response = await fetch('/api/getOrigem');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const ori = await response.json();
                
                setOrigemList(ori);
              } catch (error) { 
                console.error(error);
              }
        }
         async function fetchUnidade(){
            try {
                const response = await fetch('/api/getUnidade');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const uni = await response.json();
                
                setUnidadeList(uni);
              } catch (error) { 
                console.error(error);
              }
        }

    fetchUsers();
    fetchTag();
    fetchCamp();
    fetchOrigem();
    fetchUnidade();
    }, [])
    useEffect(()=>{

    },[])

    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [dataAtualizacao, setDataAtualizacao] = useState("");
    const [unidade, setUnidade] = useState("");
    const [origem, setOrigem] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [campanha, setCampanha] = useState("");
    const [tags, setTags] = useState("");

    const limparCampos= () => {
        setDataCadastro('')
        setDataAtualizacao('')
        setUnidade('')
        setOrigem('')
        setResponsavel('')
        setCampanha('')
        setTags('')
    }

    return(

        <Col sm={10} className="offset-sm-2">
            <div className= {styles.fundo}>
                <div className= {styles.box}>
                    <h3 className= {styles.titulo}>Lista dos Leads</h3>
                 
                </div>
            </div>
            <div className= {styles.tela}>
                <Card className= {styles.card}>
                <Form className= {styles.form}>
                    <Row >
                        <Col className="mb-3">
                            <Form.Label>Data de Cadastro</Form.Label>
                            <Form.Control type="date"  value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)}/>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Data de Atualização</Form.Label>
                            <Form.Control type="date" value={dataAtualizacao} onChange={(e) => setDataAtualizacao(e.target.value)}v/>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Unidades</Form.Label>
                           <Form.Select  onChange={(e) => setUnidade(e.target.value)}>
                                <option></option>
                                {unidadeList.map((uni) => (
                                    <option key={uni.id} value={uni.nome}>
                                        {uni.nome}
                                    </option>
                                ))}

                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                            <Form.Label>Origem</Form.Label>
                            <Form.Select  onChange={(e) => setOrigem(e.target.value)}>
                                <option></option>
                                {origemList.map((ori) => (
                                    <option key={ori.id} value={ori.nome}>
                                        {ori.nome}
                                    </option>
                                ))}

                            </Form.Select>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Responsável</Form.Label>
                            <Form.Select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
                            <option></option>
                            <option></option>
                                        <option>Wagner</option>
                                        <option>Opyt</option>
                                        <option>Maria Nayara</option>
                                        <option>Bharbara Manso</option>
                                        <option>Bharbara Manso</option>
                                        <option>Thaís Cristina</option>
                                        <option>Lucas Chalub</option>
                                        <option>Valeria</option>
                                        <option>Luanna Schulz</option>
                            </Form.Select>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Campanha</Form.Label>
                            <Form.Select  onChange={(e) => setCampanha(e.target.value)}>
                            <option></option>
                                {campList.map((camp) => (
                                <option key={camp.id} value={camp.nome}>
                                    {camp.nome}
                                    </option>
                                ))}

                            </Form.Select>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Tags</Form.Label>
                            <Form.Select onChange={(e) => setTags(e.target.value)} >
                                <option></option>
                                {tagList.map((resp) => (
                                <option key={resp.id} value={resp.nome}>
                                    {resp.nome}
                                    </option>
                                ))}

                            </Form.Select>
                        </Col>
                    </Row>
                    <div className= {styles.bot} >
                        <Button variant='secondary'onClick={limparCampos}> Limpar Filtros</Button>
                    </div>
                    </Form>
                    </Card>
                <Card className= {styles.card2}>
                    <div className= {styles.form2}>
                    <Form >
                   
                        <Form.Control type="text" placeholder='Pesquisa' value={termoPesquisa} onChange={(e) => setTermoPesquisa(e.target.value)}/>

                    </Form>
                    </div>
                    <Table className= {styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Criado em</th>
                                <th>Nome</th>
                                <th>Status</th>
                                <th>Progresso</th>
                                <th>Responsável</th>
                                <th>Origem</th>
                                <th>Unidade</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {users
                            .filter((data) =>data.nomeLead.toLowerCase().includes(termoPesquisa.toLowerCase()))
                            .filter((data) =>data.data.toLowerCase().includes(dataCadastro.toLowerCase()))
                            .filter((data) =>data.origem.toLowerCase().includes(origem.toLowerCase()))
                            .filter((data) =>data.campanha.toLowerCase().includes(campanha.toLowerCase()))
                            .filter((data) =>data.progresso.toLowerCase().includes(tags))
                            .filter((data) =>data.unidade.toLowerCase().includes(unidade.toLowerCase()))
                            .filter((data) =>data.responsavel.toLowerCase().includes(responsavel.toLowerCase()))
                            .map((data)=>(
                                <tr key={data.id} onClick={ () => { caminho(data.id)}}>
                                    <td>{data.id}</td>
                                    <td >{data.data}</td>
                                    <td >{data.nomeLead}</td>
                                    <td>{data.situacao}</td>
                                    <td>{data.progresso}</td>
                                    <td>{data.responsavel}</td>
                                    <td>{data.origem}</td>
                                    <td>{data.unidade}</td>
                                </tr>
                            ))}
                        </tbody>             
                    </Table>
                </Card>
            </div>
        </Col>
      
    )
}
export default LeadList;
