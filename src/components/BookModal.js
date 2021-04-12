import React,{useState,useEffect, useRef} from 'react'
import {Form, Modal,Button} from 'react-bootstrap'
import {LockFill,PersonBadge} from 'react-bootstrap-icons'
import axios from 'axios'
function BookModal({closeModal,id,setFlights}) {
    const [from,setFrom]=useState('')
    const [to,setTo] =useState('')
    const [departure,setDeparture] =useState('')
    const [arival,setArival] =useState('')
    const [cost,setCost] =useState()
    const [day,setDay] =useState()
    const [airline,setAirline] =useState()
    const [count,setCount] =useState()
    const [totalCost,setTotalCost] =useState()
    const days=[];
    days[0] = "Sunday";days[1] = "Monday";days[2] = "Tuesday";days[3] = "Wednesday";days[4] = "Thursday";days[5] = "Friday";
    days[6] = "Satarday";
    let i=0;
    const cref = useRef()
    useEffect(() =>{
       
        axios.get('http://localhost:8080/on-air-mvc/Flights?id='+id)
            .then(response =>{
                const data = response.data;
                setFrom(data.from_city)
                setTo(data.to_city)
                setDeparture(data.d_time)
                setArival(data.a_time)
                setCost(data.cost)
                setTotalCost(data.cost)
                setDay(data.day)
                setAirline(data.airline)
            })
            .catch(error =>{
                console.log(error)
            })
        
    },[])
    function changeP(e){
        setTotalCost(count*cost);
    }
    function handleSubmit(e){
        e.preventDefault()
        const data = {
           
        }
        axios.post('',data)
            .then(response =>{ 
            })
            .catch(error =>{
                console.log(error)
            })
        closeModal()
    }
    return (
        <>
            <Modal.Header className='bg-info' closeButton>Book</Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} className="w-100 bg-info pt-2 pb-2 pl-4 pr-4 rounded">
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'25px'}}
                >Book Flight </Form.Label>
                <Form.Group>
                    <Form.Label className="bg-info pl-2 w-100 lead text-white" style={{fontFamily:'monospace',fontSize:'23px',fontWeight:'bold'}}>
                    {"        "+from+" "}
                    { <span style={{position:'relative',color:'#ffa500',fontSize:'20px'}}>&#9992;</span>}
                    {" "+to}
                    </Form.Label>
                    <Form.Label className="bg-info text-white pl-2 w-100 lead" style={{fontFamily:'monospace',fontSize:'20px',fontWeight:'bold'}}>
                    Airline:{" "+airline}
                    </Form.Label>
                    <Form.Label className="bg-info pl-2 w-100 lead text-white" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    {"Departure Time:"+departure+" "}
                    {"  Arrival Time:"+arival}
                    </Form.Label>
                    <Form.Label className="bg-info text-white pl-2 w-100 lead" style={{fontFamily:'monospace',fontSize:'20px',fontWeight:'bold'}}>
                    Day:{" "+days[day]}
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <PersonBadge size={20}/>Number of Pasenger
                    </Form.Label>
                    <Form.Control 
                    onChange={(e) => setCount(e.target.value)}
                    type="number" required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <PersonBadge size={20}/>Cost
                    </Form.Label>
                    <Form.Control 
                    value={totalCost}
                    ref={cref}
                    onChange={(e) => setCost(e.target.value)}
                    type="number" required />
                </Form.Group>
                
                <Button type="submit" className="px-5" >Book</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
            </Modal.Body>
        </>
    )
}

export default BookModal
