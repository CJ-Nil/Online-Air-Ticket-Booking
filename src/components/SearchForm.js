import React,{useState,useRef, useEffect} from 'react'
import {Form,InputGroup,FormControl,Button, Container, Row, Col} from 'react-bootstrap'
import SearchTable from './SearchTable'
import axios from 'axios'
import '../style/liveSearch.css'
function SearchForm() {
    const from = useRef()
    const to = useRef()
    const date = useRef()
    const [searchRes,setSearchRes] = useState([]);
    const [cityList,setCityList] = useState([]);
    //const [toCityList,settoCityList] = useState([]);
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
        var f =String(from.current.value)
        var t = String(to.current.value)
        let d = new Date(date.current.value);
        const day = d.getDay()
        axios.get('http://localhost:8080/on-air-mvc/Transport?from='+f+'&to='+t+'&day='+String(day))
            .then(response =>{
                setSearchRes(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    return (
        <Container className="align-items-center"> 
            <Form.Label className="py-1 px-2 rounded bg-info text-white" style={{fontFamily:'cursive',fontSize:'20px'}}>Search your Perfect Flights</Form.Label>
           <Form inline onSubmit={handleSubmit}  
           >
               <Container className="p-1 gradient" >
                <Row className='ml-0' style={{background:'rgb(31, 30, 30)',width:'100%'}}>
                    <Col xs>
                            <InputGroup className="mb-2 mt-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="bg-info text-white bolder" style={{width:'60px'}}>From</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control ref={from} as="select" className="form-control-m" style={{overflow:'scroll'}} required>
                                <option value=''>Select Source</option>
                                {cityList}
                                </Form.Control>
                            </InputGroup>
                    </Col>
                    <Col xs>
                            <InputGroup className="mb-2 mt-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text style={{}} className="bg-info text-white bolder">To</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control ref={to} as="select" className="form-control-m" style={{overflow:'hidden'}} required>
                                <option value=''>Select Destination</option>
                                {cityList}
                                </Form.Control>
                            </InputGroup>
                    </Col>
                    <Col xs>
                            <InputGroup className="mb-2 mt-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="bg-info text-white " style={{width:'90px'}}>Depart on</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="date" style={{fontSize:'20px'}} className="form-control-m" ref = {date} required/>
                            </InputGroup>
                    </Col>
                </Row>
               </Container>
               
                
                
                <Button type="submit" className='p-2 mt-2 text-bold' variant="outline-info">
                    Search Flights
                </Button>
            </Form> 
            {searchRes.length>0?<SearchTable data={searchRes} />:null}
        </Container>
    )
}

export default SearchForm
