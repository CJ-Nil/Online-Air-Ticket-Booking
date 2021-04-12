import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import OfferRow from './OfferRow'
import {Container,Row,Col,Button,Collapse, Form,InputGroup,FormControl} from 'react-bootstrap'
function Explore() {
    const [data,setData] = useState([])
    const [open, setOpen] = useState(false);
    let id=0;
    const from = useRef()
    const to = useRef()
    const start = useRef()
    const end = useRef()
    const min = useRef()
    const max = useRef()
    const minOff = useRef()
    const maxOff = useRef()
    const [cityList,setCityList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/on-air-mvc/AllOffer')
            .then(response =>{
                setData(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
            axios.get('http://localhost:8080/on-air-mvc/CityList')
            .then(response =>{
                setCityComponent(response.data)  
            })
            .catch(error =>{
                console.log(error)
            })
    },[])
    
    //const [toCityList,settoCityList] = useState([]);
    function setCityComponent(data){
        setCityList([data.map(el => <option style={{overflow:'hidden',width:'200px'}} key={el.p_id} value={el.c_id}>{el.city+" , "+el.air_port}</option>)])
    }
    function handleSubmit(e){
        e.preventDefault()
        var f =String(from.current.value)
        var t = String(to.current.value)
        var s = String(start.current.value);
        var en = String(start.current.value);
        var minp = String(min.current.value);
        var maxp = String(max.current.value);
        var minF = String(minOff.current.value);
        var maxF = String(maxOff.current.value);
        var url='http://localhost:8080/on-air-mvc/AllOffer?';
        var temp = 'http://localhost:8080/on-air-mvc/AllOffer?';
        if(f.length>0)
        url+='from='+f;
        if(t.length>0 && url.length>temp.length)
        url+='&to='+t;
        else if(t.length>0)
        url+='to='+t;
        if(s.length>0 && url.length>temp.length)
        url+='&start='+s;
        else if(s.length>0)
        url+='start='+s;
        if(en.length>0 && url.length>temp.length)
        url+='&end='+en;
        else if(en.length>0)
        url+='end='+en;
        if(minp.length>0 && url.length>temp.length)
        url+='&minp='+minp;
        else if(minp.length>0)
        url+='minp='+minp;
        if(maxp.length>0 && url.length>temp.length)
        url+='&maxp='+maxp;
        else if(maxp.length>0)
        url+='maxp='+maxp;
        if(minF.length>0 && url.length>temp.length)
        url+='&minoff='+minF;
        else if(minF.length>0)
        url+='minoff='+minF;
        if(maxF.length>0 && url.length>temp.length)
        url+='&maxoff='+maxF;
        else if(maxF.length>0)
        url+='maxoff='+maxF;

        axios.get(url)
            .then(response =>{
                setData(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        alert("from: "+f+" to: "+t+" Start: "+s+" End: "+en+" MaxP: "+maxp+" Minp: "+minp+" MaxOff: "+maxF+" MinOff: "+minF)
    }



    return (
        <div className='body-center'>
            <div className="e-header">
                <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className='p-2 pl-3 pr-3 mt-2 text-bold' 
                variant="outline-warning"
                >
                Filter
                </Button>
                <Collapse in={open}>
                <Form inline onSubmit={handleSubmit}  
           >
               <Container className="p-2 mt-2 gradient rounded" style={{marginLeft:'0px'}} >
                <Row className='ml-0' style={{background:'#000',width:'100%'}}>
                    <Col xs>
                            <InputGroup className="mb-2 mt-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="bg-info text-white bolder" style={{width:'130px'}}>From</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control ref={from} as="select" className="form-control-m" style={{overflow:'scroll'}}>
                                <option value=''>Select Source</option>
                                {cityList}
                                </Form.Control>
                            </InputGroup>
                    </Col>
                    <Col xs>
                            <InputGroup className="mb-2 mt-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text style={{width:'130px'}} className="bg-info text-white bolder" >To</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control ref={to} as="select" className="form-control-m" style={{overflow:'hidden'}} >
                                <option value=''>Select Destination</option>
                                {cityList}
                                </Form.Control>
                            </InputGroup>
                    </Col>
                </Row>
                <Row className='ml-0' style={{background:'#000',width:'100%'}}>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Starting Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="date" style={{fontSize:'20px'}} className="form-control-m" ref = {start}/>
                        </InputGroup>
                    </Col>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Ending Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="date" style={{fontSize:'20px'}} className="form-control-m" ref = {end} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='ml-0' style={{background:'#000',width:'100%'}}>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Minimum Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" style={{fontSize:'20px'}} className="form-control-m" ref = {min}/>
                        </InputGroup>
                    </Col>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Maximum Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" style={{fontSize:'20px'}} className="form-control-m" ref = {max} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='ml-0' style={{background:'#000',width:'100%'}}>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Minimum Offer</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" style={{fontSize:'20px'}} className="form-control-m" ref = {minOff}/>
                        </InputGroup>
                    </Col>
                    <Col xs>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Prepend >
                                <InputGroup.Text className="bg-info text-white " style={{width:'130px'}}>Maximum Offer</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" style={{fontSize:'20px'}} className="form-control-m" ref = {maxOff} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='ml-0' style={{background:'#000',width:'100%'}}>
                    <Button type="submit" className='p-2 mt-2 ml-3 mb-2 text-bold' variant="outline-info">
                        Search Offers
                    </Button>
                </Row>
               </Container>
                
            </Form> 
                </Collapse>
            </div>
            <div >
            <Container className=" mx-0 my-2">
                    <Row className="text-white rounded " 
                    style={{fontFamily:'serif',fontWeight:'bolder',
                    backgroundColor:'MediumSeaGreen',height:'60px',
                    fontSize:'25px'}}>
                        <Col xs ><div className="center">From</div></Col>
                        <Col xs ><div className="center">To</div></Col>
                        <Col xs ><div className="center">Departure</div></Col>
                        <Col xs ><div className="center">Arrival</div></Col>
                        <Col xs ><div className="center">Offer</div></Col>
                        <Col xs ><div className="center">Price</div></Col>
                        <Col xs ><div className="center">start</div></Col>
                        <Col xs ><div className="center">end</div></Col>
                        <Col xs ><div className="center">{" "}</div></Col>
                    </Row>
                </Container>
                <Container className="my-2 mb-2 mx-0 res-overflow rounded" 
                    style={{height:'550px',overflow:"scroll",border:'2px solid MediumSeaGreen',
                    fontSize:'1.2rem'
                    }}
                >
                {
                 data.map( el => <OfferRow
                    key={id++} 
                    id={el.t_id}
                    a_time={el.a_time} d_time={el.d_time}
                    from ={el.from_city}
                    to={el.to_city}
                    off={el.offer}
                    originalCost = {el.original_cost} 
                    offerCost = {el.offer_cost}
                    start = {el.start}
                    end = {el.end}

                    /> )
                }       
                </Container>    
               
            </div>
        </div>
    )
}

export default Explore