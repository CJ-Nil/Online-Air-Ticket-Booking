import React from 'react'
import {Navbar,Nav,Button,DropdownButton,Dropdown} from 'react-bootstrap'
import {getName,getSessionCookie} from './Session'
import * as Cookies from "js-cookie";
import axios from 'axios'
function NavBar() {
  const sessionid = getSessionCookie()
  const name = getName()
  function handleLogout(){
    let details = {
      username:name+"",
      session:sessionid+"",
    }
    axios.post('http://localhost:8080/on-air-mvc/Logout',details)
      .then(response =>{
        if(response.data === true){
          Cookies.remove("session");
          Cookies.remove("name");
          window.location.reload();
        }  
      })
      .catch(error =>{
          console.log(error)
      })
  }
  return (
    <div style={{height:'30px'}}>
        <Navbar bg="dark" variant="dark" fixed="top" style={{height:'60px'}}>
          <Navbar.Brand href = "/" 
          style={{
            fontSize:'4vh',
            fontFamily:'monospace', 
            textShadow: '4px 4px 4px gray',
            color:'#00BFFF'
          }}>
            <span style={{position:'absolute',
            transform:'rotate(-90deg)'
          }}>
            &#9992;
            </span>
            <div
            style={{paddingLeft:'30px'}}
            > OnAir</div>
            </Navbar.Brand>
          <Nav className="mr-auto" style={{color:'F7F7F7'}}>
            <Nav.Link href="/">Home {"    "}</Nav.Link>
            <Nav.Link href="/explore">Explore-Offers</Nav.Link>
          </Nav>
          {
            (name===undefined)?
            (<Button href="/Login" variant="outline-info">Admin</Button>):
            (
              <DropdownButton id="dropdown-item-button" title={name}>
                <Dropdown.Item as="button" 
                onClick={(e) => { if (window.confirm('Are you sure you wish to logout?')) handleLogout(e) } }
                >LogOut</Dropdown.Item>
              </DropdownButton>
            )
          }
        </Navbar>
    </div>
  )
}

export default NavBar