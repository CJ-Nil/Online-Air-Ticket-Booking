import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import RowCard from './RowCard'
function SearchTable({data}) {
    let id=0
    return (
            <>
                <Container className=" mx-0 my-2">
                    <Row className="text-white rounded" 
                    style={{fontFamily:'serif',fontWeight:'bolder',
                    backgroundColor:'MediumSeaGreen',height:'60px',
                    fontSize:'25px'}}>
                        <Col xs ><div className="center">Airline</div></Col>
                        <Col xs ><div className="center">Departure</div></Col>
                        <Col xs ><div className="center">Arival</div></Col>
                        <Col xs ><div className="center">Price</div></Col>
                        <Col xs></Col>
                    </Row>
                </Container>
                <Container className="my-2 mb-2 mx-0 w-100 res-overflow rounded" 
                    style={{height:'500px',overflow:"scroll",border:'2px solid MediumSeaGreen',
                    fontSize:'1.2rem'
                    }}
                >
                {
                 data.map( el => <RowCard 
                    key={id++} air={el.airline} dtime={el.d_time} atime={el.a_time} 
                    original_cost={el.original_cost} offer_cost={el.offer_cost} offer={el.offer} 
                    id = {el.id}
                    /> )
                }       
                </Container>    
            </>
    )
}

export default SearchTable
