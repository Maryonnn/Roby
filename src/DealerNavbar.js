import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/Nav';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';



function DealerNavbar() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (

      
<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
        {/* Sidebar contents */}
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/dealerhome" className="text-decoration-none" style={{ color: 'inherit' }}>
           Robie Regal Rides
            </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
                {/* Sidebar menu items */}
                <Nav.Link href="/dealerhome">
                <CDBSidebarMenuItem icon="columns">Available Cars</CDBSidebarMenuItem>
                    </Nav.Link>
                <Nav.Link href="/dealerinventory">
                <CDBSidebarMenuItem icon="shopping-bag">Inventory</CDBSidebarMenuItem>
                </Nav.Link>
                <Nav.Link href="/dealersales">
                <CDBSidebarMenuItem icon="chart-line">Sales</CDBSidebarMenuItem>
                </Nav.Link>
            </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div style={{ padding: '20px 5px', cursor: 'pointer' }} onClick={logout}>
    Logout
</div>
        </CDBSidebarFooter>
    </CDBSidebar>

  
</div>


  );
}

export default DealerNavbar;