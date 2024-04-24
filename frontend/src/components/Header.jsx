import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">
                        Home
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link></Nav.Link>
                            <Nav.Link href="/login"><FaUser />Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;