import React,{useEffect,useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {LockFill,PersonBadge,GeoAlt, Clock,Calendar2Day} from 'react-bootstrap-icons'
import axios from 'axios'
import {getSessionCookie} from './Session'

function AddFlight() {
    const [cityList,setCityList] = useState([]);
    const sessionid = getSessionCookie()
    const [from,setFrom]=useState('')
    const [to,setTo] =useState('')
    const [departure,setDeparture] =useState('')
    const [arival,setArival] =useState('')
    const [cost,setCost] =useState('')
    const [day,setDay] =useState('')
    const [airline,setAirline] =useState('')
    const [airLineList,setAirLineList] = useState([])
    const days=[];
    days[0] = "Sunday";days[1] = "Monday";days[2] = "Tuesday";days[3] = "Wednesday";days[4] = "Thursday";days[5] = "Friday";
    days[6] = "Satarday";
    let i=0;
    useEffect(() =>{
        axios.get('http://localhost:8080/on-air-mvc/CityList')
            .then(response =>{
                setCityComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
        axios.get('http://localhost:8080/on-air-mvc/AirLines')
            .then(response =>{
                setAirlineComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
    },[])
    function setAirlineComponent(data){
       // console.log(data)
        setAirLineList([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.a_id} value={el.a_id}>{el.name}</option>)])
    }
    function setCityComponent(data){
        //console.log(data)
        setCityList([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.p_id} value={el.c_id}>{el.city+" , "+el.air_port}</option>)])
    }
    function handleSubmit(e){
        e.preventDefault()
        const data = {
            from:from+"",to:to+"",cost:cost+"",depature:departure+"",arival:arival+"",airline:airline+"",session:sessionid+"",day:day+""
        }
        axios.post('http://localhost:8080/on-air-mvc/AddFlight',data)
            .then(response =>{
                console.log(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
    }
    return (
        <Form onSubmit={handleSubmit} className=" bg-info pt-2 pb-2 pl-4 pr-4 ml-2 rounded" style={{height:'650px',overflowY:'scroll'}} >
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'20px'}}
                >Add Flight</Form.Label>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <GeoAlt size={20}/>Source
                    </Form.Label>
                    <Form.Control 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    as="select" className="form-control-m" style={{overflow:'scroll'}} required>
                        <option value=''>Select Source</option>
                        {cityList}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                        <GeoAlt size={20} /> Destination
                    </Form.Label>
                    <Form.Control value={to}
                     onChange={(e) => setTo(e.target.value)}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Destination</option>
                        {cityList}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    &#9992; Airline
                    </Form.Label>
                    <Form.Control value={airline}
                     onChange={(e) => setAirline(e.target.value)}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Airline</option>
                        {airLineList}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                      &#8377; Cost
                    </Form.Label>
                    <Form.Control 
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    type="number" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> Departure
                    </Form.Label>
                    <Form.Control 
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    type="time" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> Arival
                    </Form.Label>
                    <Form.Control
                    value={arival}
                    onChange={(e) => setArival(e.target.value)}
                    type="time" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                        <Calendar2Day size={20} /> Day
                    </Form.Label>
                    <Form.Control value={day}
                     onChange={(e) => setDay(e.target.value)}
                     as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Day</option>
                        {
                           
                           days.map(el =><option style={{overflow:'hidden',width:'200px'}} key={i} value={i++}>{el}</option>) 
                        }
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="px-5" >Save</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
    )
}

export default AddFlight
