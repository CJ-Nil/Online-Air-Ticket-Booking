import React,{useEffect,useState} from 'react'
import {Form, Modal,Button} from 'react-bootstrap'
import {Clock, GeoAlt, LockFill,PersonBadge, ReceiptCutoff} from 'react-bootstrap-icons'
import axios from 'axios'
import {getSessionCookie} from './Session'
function EditModal({closeModal,id,setOffData}) {
    const [cityList,setCityList] = useState([]);
    const sessionid = getSessionCookie()
    const [from,setFrom]=useState('')
    const [to,setTo] =useState('')
    const [start,setStart] =useState('')
    const [end,setEnd] =useState('')
    const [offer,setOffer] =useState('')
    useEffect(() =>{
        axios.get('http://localhost:8080/on-air-mvc/AdminOffer?id='+id+"&session="+sessionid)
            .then(response =>{
                console.log(response.data)
                const data = response.data;
                setFrom(data.from_id);
                setTo(data.to_id);
                setOffer(data.offer);
                console.log(typeof start)
                /*var sdate =new Date(Date.parse(data.start))
                sdate = sdate.toString().split(".")[0]
                setStart(sdate)
                var edate =new Date(Date.parse(data.start))
                edate = edate.toString().split(".")[0]
                setEnd(edate)*/
                var sdate = data.start.toString().split(" ")[0];
                var stime = data.start.toString().split(" ")[1].split(".")[0];
                setStart(sdate+"T"+stime)
                var edate = data.end.toString().split(" ")[0];
                var etime = data.end.toString().split(" ")[1].split(".")[0];
                setEnd(edate+"T"+etime)
               // var stime = String(data.start).spilt(' ')[1]
                //setStart(sdate+stime)
               // var sdatetime= sdate+stime
               // alert(sdatetime)
            })
            .catch(error =>{
                console.log(error)
            })
        axios.get('http://localhost:8080/on-air-mvc/CityList')
            .then(response =>{
                console.log(response.data)
                setCityComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
        
        
        
    },[])
    function setCityComponent(data){
        console.log(data)
        setCityList([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.p_id} value={el.c_id}>{el.city+" , "+el.air_port}</option>)])
    }
    function handleSubmit(e){
        e.preventDefault()
        const data = {
            id:id+"",from:from+"",to:to+"",offer:offer+"",start:start+"",end:end+"",session:sessionid+""
        }
        axios.post('http://localhost:8080/on-air-mvc/EditOffer',data)
            .then(response =>{
                console.log(response.data)
                setOffData(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
        closeModal()
    }
    return (
        <>
            <Modal.Header className='bg-info' closeButton>Edit Flight Offer Details</Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} className="w-100 bg-info pt-2 pb-2 pl-4 pr-4 rounded">
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'20px'}}
                >Add Offer</Form.Label>
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
                    <ReceiptCutoff size={20}/> Offer Percentage
                    </Form.Label>
                    <Form.Control 
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    type="number" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> Start Time
                    </Form.Label>
                    <Form.Control 
                    value={start}
                    onChange={(e) => {
                        setStart(e.target.value)
                    }}
                    type="datetime-local" required  />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> End Time
                    </Form.Label>
                    <Form.Control
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    type="datetime-local" required  />
                </Form.Group>
                <Button type="submit" className="px-5" >Save</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
            </Modal.Body>
        </>
    )
}

export default EditModal
