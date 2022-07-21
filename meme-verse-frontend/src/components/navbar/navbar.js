import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap';
import { signout, userInfo } from '../../utils/auth'
import { useState } from 'react';
import MemeModal from '../Memes/memeModal';

function Navabr({ history }) {
    const { name } = userInfo()
    let [open, setOpen] = useState(false)
    const modalOpen = () => {
        setOpen(!open)
    }

    return (
        <div>
            <MemeModal open={open} modalOpen={modalOpen}/>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">Meme Verse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                        <Nav >
                            <Nav.Link onClick={modalOpen}>Share Meme</Nav.Link>
                            <NavDropdown title={name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={() => {
                                    signout(() => {
                                        history.push('/login')
                                    })
                                }}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navabr;