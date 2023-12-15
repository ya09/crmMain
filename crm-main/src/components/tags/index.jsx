import {  Col, Form, Row, Card, Button, Table, Modal, Dropdown} from 'react-bootstrap';
import styles from './tags.module.css'
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function  AdTags (){

    const [tags, setTags] = useState([]);
    useEffect(() => {
        async function fetchUsers(){
            try {
                const response = await fetch('/api/getTag');
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                setTags(data);
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
    const [responsavel, setResponsavel] = useState('')

    const enviar = async (e) => {

    
        if(
           nome === ' ',
           responsavel === ' ' 
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
            situacao: 'Ativo',
            responsavel: responsavel,
            data : dataAtual
        }
        const res = await fetch ('/api/adTag', {
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
                    <h3 className= {styles.titulo}>Tags</h3>
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
                                <th>Criado por</th>
                                <th>Criado em</th>
                                <th>Status</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {tags
                            .filter((data) =>data.nome.toLowerCase().includes(termoPesquisa.toLowerCase()))
                            .map((data)=>(
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td >{data.nome}</td>
                                    <td>{data.responsavel}</td>
                                    <td>{data.data}</td>
                                    <td>{data.situacao}</td>
                                </tr>
                            ))}
                        </tbody>             
                    </Table>
                </Card>
                <Modal show={modal} onHide={handleCloseModal} size="lg" >
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar um nova Tag</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className= {styles.modal}>
                                <Row>
                                    <Col  className="mb-3">
                                    <Form.Label>Nome da Tag:</Form.Label>
                                    <Form.Control type="name" onChange={(e) => setNome(e.target.value)}/>
                                    </Col>
                                    <Col  className="mb-3">
                                    <Form.Label>Responsável:</Form.Label>
                                    <Form.Select  onChange={(e) => setResponsavel(e.target.value)}>
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
                            </Form>
                            <Button variant='danger' onClick={handleCloseModal} className= {styles.botao2}> Cancelar</Button>
                            <Button variant='success' onClick={enviar}>Adicionar</Button>
                        </Modal.Body>
                    </Modal>
            </div>
        </Col>
      
    )
}
export default AdTags;
