import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

function DealerNavbar() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar expand="lg" style={{backgroundColor:'#4B3832'}} data-bs-theme="dark" sticky="top">
      <Container>
        <Image src='logo.png' style={{width: '60px', height: '60px'}}/> 
        <Navbar.Brand href="/dealerhome">AutoHub</Navbar.Brand>
            <Navbar.Offcanvas bplacement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                    Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/dealerhome">Vehicles</Nav.Link>
                        <Nav.Link href="/dealerinventory">Inventory</Nav.Link>
                        <Nav.Link href="/dealersales">Sales</Nav.Link>
                        <NavDropdown title="MyAccount">
                            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
  );
}

export default DealerNavbar;