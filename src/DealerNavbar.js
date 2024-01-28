import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import "./app.css";

function DealerNavbar() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <CDBSidebar textColor="#fff" backgroundColor="#333" className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} className="sidebar-header">
          <a href="/dealerhome" className="text-decoration-none" style={{ color: 'inherit' }}>
            Roby Regal Rides
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Nav.Link href="/dealerhome">
              <CDBSidebarMenuItem icon="columns" className="sidebar-menu-item">Available Cars</CDBSidebarMenuItem>
            </Nav.Link>
            <Nav.Link href="/dealerinventory">
              <CDBSidebarMenuItem icon="shopping-bag" className="sidebar-menu-item">Inventory</CDBSidebarMenuItem>
            </Nav.Link>
            <Nav.Link href="/dealersales">
              <CDBSidebarMenuItem icon="chart-line" className="sidebar-menu-item">Sales</CDBSidebarMenuItem>
            </Nav.Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }} className="sidebar-footer">
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default DealerNavbar;
