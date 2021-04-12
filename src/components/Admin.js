import React from 'react'
import {getSessionCookie} from './Session'
function Admin(props) {
    
    const session = getSessionCookie()
    console.log(session)
    if (session === undefined) {
        props.history.push("/Login");
     }
     else{
        props.history.push("/AdminPanel");
     }
    return (
            <div><h1>Admin</h1></div>
    )
}
export default Admin
