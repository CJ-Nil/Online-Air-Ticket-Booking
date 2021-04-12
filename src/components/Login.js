import React, {useRef} from 'react';
import {Button,Form,Container} from 'react-bootstrap';
import {LockFill,PersonBadge} from 'react-bootstrap-icons'
import axios from 'axios'
import { getSessionCookie, setSessionCookie ,setName} from './Session';
function Login(props) {
  const idRef=useRef()
  const pwdRef=useRef()
  const session = getSessionCookie()
  if(session!=null)
  props.history.push('/AdminPanel');
  // handle button click of login form
  const handleLogin = (e) => {
    e.preventDefault()
    let details = {
      username:idRef.current.value+"",
      password:pwdRef.current.value+"",
    }
    axios.post('http://localhost:8080/on-air-mvc/Login',details)
      .then(response =>{
          const data = response.data
          if(data.session !== ""){
            setSessionCookie(data.session)
            setName(details.username)
            props.history.push('/AdminPanel');
            window.location.reload();
          }
          else
          alert("Inavlid username or password!!");
      })
      .catch(error =>{
          console.log(error)
      })
  }

  return (
    <Container className="align-items-center d-flex" style={{height:'100vh'}}>
            <Form onSubmit={handleLogin} className="w-100 bg-info p-4 rounded">
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'30px'}}
                >Log In</Form.Label>
                <Form.Group>
                    <Form.Label className="bg-warning p-2 w-100 lead" style={{fontFamily:'monospace',fontSize:'20px',fontWeight:'bold'}}>
                    <PersonBadge size={30}/> User Name
                    </Form.Label>
                    <Form.Control type="text" required ref={idRef} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-2 w-100 lead" style={{fontFamily:'monospace',fontSize:'20px',fontWeight:'bold'}}>
                        <LockFill size={30}></LockFill> Password
                    </Form.Label>
                    <Form.Control type="password" required ref={pwdRef} />
                </Form.Group>
                <Button type="submit" className="px-5" >Login</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
        </Container>
  );
}

export default Login;