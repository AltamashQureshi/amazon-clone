import React from 'react'
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import amazon from './amazon.png'


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
      dispatch(logout())
    }

    return (  
        <header>
          <Navbar bg="dark" varient="white" expand="lg" sticky="top" collapseOnSelect>
            <Container>
            <div className="header">
              <LinkContainer to= '/'>
                <img
                  className="header__logo"
                  src={amazon}          
                />
              </LinkContainer>
            </div>        
              <LinkContainer to='/'>
                <Navbar.Brand href="/">Amazon Clone</Navbar.Brand> 
              </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="ml-auto">
                      <LinkContainer to='/cart'>
                      <Nav.Link ><i className="fas fa-shopping-cart" ></i>Cart</Nav.Link>
                      </LinkContainer>

                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>                          
                          </LinkContainer>

                            <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                          
                        </NavDropdown>
                      ):(
                        
                      <LinkContainer to='/login'>
                          <Nav.Link ><i className="fas fa-user" ></i>Login</Nav.Link> 
                      </LinkContainer> 

                      )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                   


          
                    </Nav>    
                </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    )
}

export default Header
