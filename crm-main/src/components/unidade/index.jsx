import {  Col, Form, Row, Card, Button, Table, Modal, Dropdown} from 'react-bootstrap';
import styles from './unidade.module.css'
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function  AdUnidade (){

    const [unidade, setUnidade] = useState([]);
    useEffect(() => {
        async function fetchUsers(){
            try {
                const response = await fetch('/api/getUnidade');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUnidade(data);
              } catch (error) { 
                console.error(error);
              }
        }
    fetchUsers();
    }, [])

    const pegarDataAtual = () => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        
        const dataFormatada = `${dia}-${mes}-${ano}`;
        return dataFormatada;
      };
      const dataAtual = pegarDataAtual();

    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')

    const enviar = async (e) => {

    
        if(
           nome === ' '
         
        ){

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
            const addOnline = {
            nome: nome,
            endereco: endereco,
            situacao: 'Ativo',
            data : dataAtual
        }
        const res = await fetch ('/api/adUnidade', {
            method: 'POST',
            body: JSON.stringify (addOnline),
            headers:{'Content-Type': 'application/json'}
        })

        }
        window.location.reload();
    }

    const [termoPesquisa, setTermoPesquisa] = useState("");

    const [modal, setModal] = useState(false);
    const handleCloseModal = () => setModal(false);
    const handleModal = () => setModal(true);

    return(

        <Col sm={10} className="offset-sm-2">
            <div className= {styles.fundo}>
                <div className= {styles.box}>
                    <h3 className= {styles.titulo}>Origens</h3>
                    <Button variant='success' className= {styles.botao} onClick={handleModal}>Adicionar</Button>
                 
                </div>
            </div>
            <div className= {styles.tela}>
                <Card className= {styles.card2}>
                    <div className= {styles.div2}>
                    
                    <Form className= {styles.form2}>
                    
                        <Form.Label>Pesquisar:</Form.Label>
                        <Form.Control type="text" placeholder='Pesquisa' value={termoPesquisa} onChange={(e) => setTermoPesquisa(e.target.value)}/>

                    </Form>
                    </div>
                    <Table className= {styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Criado em</th>
                                <th>Status</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {unidade
                            .filter((data) =>data.nome.toLowerCase().includes(termoPesquisa.toLowerCase()))
                            .map((data)=>(
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td >{data.nome}</td>
                                    <td>{data.endereco}</td>
                                    <td>{data.data}</td>
                                    <td>{data.situacao}</td>

                                </tr>
                            ))}
                        </tbody>             
                    </Table>
                </Card>
                <Modal show={modal} onHide={handleCloseModal} size="lg" >
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar uma nova Unidade</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className= {styles.modal}>
                                <Row>
                                    <Col  className="mb-3">
                                    <Form.Label>Nome:</Form.Label>
                                    <Form.Control type="name" onChange={(e) => setNome(e.target.value)}/>
                                    </Col>
                                    <Col  className="mb-3">
                                    <Form.Label>Endereço:</Form.Label>
                                    <Form.Control type="name" onChange={(e) => setEndereco(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form>
                            <Button variant='danger' onClick={handleCloseModal} className= {styles.botao2}> Cancelar</Button>
                            <Button variant='success' onClick={enviar}>Adicionar</Button>
                        </Modal.Body>
                    </Modal>
            </div>
        </Col>
      
    )
}
export default AdUnidade;
