import React,{useEffect,useState,useRef} from 'react'
import {Button, Form} from 'react-bootstrap'
import {Clock, GeoAlt, LockFill,PersonBadge, ReceiptCutoff} from 'react-bootstrap-icons'
import axios from 'axios'
import {getSessionCookie} from './Session'
function OfferAdd(props) {
    const from = useRef()
    const to = useRef()
    const off = useRef()
    const start_date = useRef()
    const end_date = useRef()
    const [cityList,setCityList] = useState([]);
    const sessionid = getSessionCookie()
    useEffect(() =>{
        axios.get('http://localhost:8080/on-air-mvc/CityList')
            .then(response =>{
                setCityComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
    },[])
    function setCityComponent(data){
        setCityList([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.p_id} value={el.c_id}>{el.city+" , "+el.air_port}</option>)])
    }
    function handleSubmit(e){
        e.preventDefault()
        const offer={
            from:from.current.value,
            to:to.current.value,
            off:off.current.value,
            start:start_date.current.value,
            end:end_date.current.value,
            session:sessionid
        }
        axios.post('http://localhost:8080/on-air-mvc/AddOffer',offer)
            .then(response =>{
                props.setDataArray(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
        from.current.value=""
        to.current.value = ""
        start_date.current.value=""
        end_date.current.value=""
    }
    return (
        <div>
             <Form onSubmit={handleSubmit} className="w-100 bg-info pt-2 pb-2 pl-4 pr-4 rounded">
                <Form.Label className='p-2 text-white bolder w-100 rounded'
                style={{fontFamily:'fantasy',fontSize:'20px'}}
                >Add Offer</Form.Label>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <GeoAlt size={20}/>Source
                    </Form.Label>
                    <Form.Control ref={from} as="select" className="form-control-m" style={{overflow:'scroll'}} required>
                        <option value=''>Select Source</option>
                        {cityList}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                        <GeoAlt size={20} /> Destination
                    </Form.Label>
                    <Form.Control ref={to} as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                        <option value=''>Select Destination</option>
                        {cityList}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <ReceiptCutoff size={20}/> Offer Percentage
                    </Form.Label>
                    <Form.Control type="number" required ref={off} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> Start Time
                    </Form.Label>
                    <Form.Control type="datetime-local" required ref={start_date} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="bg-warning p-1 w-100 lead" style={{fontFamily:'monospace',fontSize:'15px',fontWeight:'bold'}}>
                    <Clock size={20}/> End Time
                    </Form.Label>
                    <Form.Control type="datetime-local" required ref={end_date} />
                </Form.Group>
                <Button type="submit" className="px-5" >Save</Button>
                <span id ='wa' className='text-danger bold'></span>
            </Form>
        </div>
    )
}

export default OfferAdd
