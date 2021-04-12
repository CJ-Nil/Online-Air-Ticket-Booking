import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button, Table,Modal} from 'react-bootstrap'
import {getSessionCookie} from './Session'
import FlightEditModal from './FlightEditModal'

function FlightsTable() {
    const [modalOpen, setModalOpen] = useState(false)
    const [tid,setTid] = useState()
    function closeModal(){
        setModalOpen(false)
    }
    const sessionid = getSessionCookie()
    const d={id:sessionid}
    let index = 0;
    const [flights,setFlights] = useState([])
    useEffect(()=>{
        axios.post("http://localhost:8080/on-air-mvc/Flights",d)
        .then(response =>{
            const data = response.data
            setFlights(data)
            console.log(data);
        })
        .catch(error =>{
            console.log(error)
        })
    },[])
    function editHandler(e){
        setTid(e.target.id)
        setModalOpen(true);
    }
    function deleteHandler(e){
        const id=e.target.id;
        const sd = {session:sessionid,tid:id}
        axios.post("http://localhost:8080/on-air-mvc/DeleteFlight",sd)
        .then(response =>{
            const data = response.data
            setFlights(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <div 
        style={{fontFamily:'sans-serif',fontWeight:'bolder',
        fontSize:'1rem',background:'white',color:'burlywood',
        height:'650px',overflowY:'scroll'}}>
        <Table striped bordered hover responsive="lg" size="sm" className="text-success" >
            <thead>
                <tr>
                <th>#</th>
                <th>Airline</th>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Arival</th>
                <th>Cost</th>
                <th>Day</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody >
                {
                    flights.map((el) => {
                        return(<tr key={index}>
                            <td>{index++}</td>
                            <td>{el.airline}</td>
                            <td>{el.from_city}</td>
                            <td>{el.to_city}</td>
                            <td>{el.d_time}</td>
                            <td>{el.a_time}</td>
                            <td>&#8377;{el.cost}</td>
                            <td>{el.day}</td>
                            <td><Button id={el.t_id} variant="outline-warning" onClick={editHandler}>Edit</Button></td>
                            <td><Button id={el.t_id} variant="outline-danger" 
                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(e) } }
                            >Delete</Button></td>
                        </tr>)
                    })
                }
                
            </tbody>
        </Table>
        <Modal show={modalOpen} onHide={closeModal} >
            <FlightEditModal closeModal={closeModal} id={tid} setFlights={setFlights} />
        </Modal>
        </div>
    )
}

export default FlightsTable
