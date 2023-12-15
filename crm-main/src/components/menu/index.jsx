import {  Row, Col, Image, Nav} from 'react-bootstrap';
import styles from './menu.module.css'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';


function Menu() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Col sm={2} className="text-white position-fixed" style={{ height: '100vh', backgroundColor: 'orange' }}>
        <div>
            <h1 className= {styles.titulo} >Opyt</h1>
            <hr  className= {styles.linha}/>
        </div>
        <div>
            <p className= {styles.menu}>MENU</p>
        </div>
        <div>
            <Row>
                <Col>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/'>
                    <Image  className= {styles.img} src="leads.png" width={20} height={20} ></Image>
                       Leads
                    </Nav.Link>
                </Nav>
                </Col>
            </Row>
            <Row>
                <Col>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/lista'>
                    <Image  className= {styles.img} src="leads.png" width={20} height={20} ></Image>
                       Listar Leads
                    </Nav.Link>
                </Nav>
                </Col>
                <Row>
                <Col>
                <Nav>
                    <Nav.Link className= {styles.nav}  onClick={handleShow}>
                    <Image  className= {styles.img} src="parametro.png" width={20} height={20}  ></Image>
                    Parâmetros
                    </Nav.Link>
                </Nav>
                </Col>
                </Row>
            </Row> 
            <Offcanvas show={show} onHide={handleClose} className= {styles.off}>
                <Offcanvas.Header closeButton >
                <Offcanvas.Title>Parâmetros</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Row>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/tags'>Tags</Nav.Link>
                </Nav>
                </Row>
                <Row>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/campanha'>Campanha</Nav.Link>
                </Nav>
                </Row>
                <Row>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/origem'>Origem</Nav.Link>
                </Nav>
                </Row>
                <Row>
                <Nav>
                    <Nav.Link className= {styles.nav} href='/unidade'>Unidade</Nav.Link>
                </Nav>
                </Row>
                </Offcanvas.Body>
            </Offcanvas>           
        </div>
  </Col>
  );
};

export default Menu;