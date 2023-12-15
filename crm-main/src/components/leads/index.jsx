import { Button, Col, Form, Row, Card, Container} from 'react-bootstrap';
import styles from '@/components/leads/Lead.module.css'
import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function Lead (){

    const [nomeLead, setNomeLead] = useState('')
    const [cpf, setCpf] = useState('')
    const [sobre, setSobre] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [unidade, setUnidade] = useState('')
    const [origem, setOrigem] = useState('')
    const [campanha, setCampanha] = useState('')
    const [titulo, setTitulo] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [data, setData] = useState('')

    const [campList, setCampList] = useState([]);
    const [origemList, setOrigemList] = useState([]);
    const [unidadeList, setUnidadeList] = useState([]);

    useEffect (()=>{
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
        fetchCamp();
        fetchOrigem();
        fetchUnidade();

    }, [])

    const enviar = async (e) => {

        if(nomeLead === '', 
           email === '',
           telefone === '', 
           sobre === '',
           nome === '',
           unidade === '',
           cpf === '',
           origem === '', 
           campanha === '', 
           titulo === '',
           responsavel === '' ,
           data === '' ){

            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'deu ruim',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
            Swal.fire(

                    'Dados enviados com sucesso',
                    'Obrigada!',
                    'success',
                    '2000000'
              
              )
            console.log(nome)
            const addOnline = {
            nomeLead: nomeLead,
            nome: nome,
            email: email,
            telefone: telefone,
            sobre: sobre,
            nome: nome,
            unidade: unidade,
            cpf: cpf,
            origem: origem,
            campanha: campanha,
            titulo: titulo,
            situacao: 'novo',
            progresso: 'novo',
            responsavel: responsavel,
            data : data,
            dataAtualizacao: 'sem atualizações'
        }
        const res = await fetch ('/api/adLead', {
            method: 'POST',
            body: JSON.stringify (addOnline),
            headers:{'Content-Type': 'application/json'}
        })
        }
    }
    return(
        <Col sm={10} className="offset-sm-2">
            <div className= {styles.fundo}>
                <div className= {styles.box}>
                    <h3 className= {styles.titulo}>Adicionar um novo Lead</h3>
                    <div className= {styles.boxBot}>

                    </div>
                </div>
            </div>
            <div className= {styles['tela']}>
                <Card className= {styles['card']}>
                    <Container className= {styles['container']}>
                    <Form className= {styles.modal}>
                                <Row>
                                    <Col  className="mb-3">
                                    <Form.Label>Nome do Lead</Form.Label>
                                    <Form.Control type="name" onChange={(e) => setNomeLead(e.target.value)}/>
                                    </Col>
                                    <Col  className="mb-3">
                                    <Form.Label>CPF/CNPJ</Form.Label >
                                    <Form.Control type="text" onChange={(e) => setCpf(e.target.value)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="name" onChange={(e) => setNome(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-3">
                                        <Form.Label>Titulo</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setTitulo(e.target.value)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mb-3">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control type="tel" onChange={(e) => setTelefone(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control type="date" onChange={(e) => setData(e.target.value)}/>
                                    </Col>
                                    <Row>
                                        <Col className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="e-mail" onChange={(e) => setEmail(e.target.value)}/>
                                    </Col>
                                    </Row>
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
                                </Row>
                                <Row>
                                    <Col className="mb-3">
                                        <Form.Label>Unidade</Form.Label>
                                        <Form.Select  onChange={(e) => setUnidade(e.target.value)}>
                                            <option></option>
                                            {unidadeList.map((uni) => (
                                                <option key={uni.id} value={uni.nome}>
                                                {uni.nome}
                                                </option>
                                            ))}

                                        </Form.Select>
                                    </Col>
                                    <Col className="mb-3">
                                        <Form.Label>Responsável</Form.Label>
                                        <Form.Select onChange={(e) => setResponsavel(e.target.value)}>
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
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sobre</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setSobre(e.target.value)}/>
                                </Form.Group>
                                <Button variant='danger'  className= {styles['botao']}> Cancelar</Button>
                            <Button variant='success' onClick={enviar}>Adicionar</Button>
                            </Form>
                    </Container>         
                </Card>
            </div>
      </Col>
      
    )
}
export default Lead;