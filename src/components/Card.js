import React from 'react';
import {Card,Badge} from 'react-bootstrap'
import {ArrowLeftRight} from 'react-bootstrap-icons'
import '../style/card.css'

function card(props) {
    return (
    <Card
    text= 'white'
    style={{ width: '100%',height:'100%' }}
    className="bg-gradient"
    >
      <Card.Header style={{height:'50px',marginBottom:'0px'}} className="bg-gradient2">
        <Card.Title style={{fontSize:'25px',fontWeight:'bolder'}}>
          <span style={{fontSize:'15px'}}>{props.d_time}</span>
          <Badge pill variant="warning" >{props.src}</Badge> 
          {" "}
          <span style={{color:"#6a5acd",fontWeight:'bolder',fontSize:'30px'}}>
           &#9992; 
          </span>
          {" "}
          <Badge pill variant="warning">{props.dest}</Badge>
          <span style={{fontSize:'15px'}}>{props.a_time}</span>
        </Card.Title>
      </Card.Header>
      <Card.Body >
        <div className="center">
        <Card.Title style={{fontStyle:'oblique'}}>
          <Badge variant="success" style={{fontSize:'25px'}}>&#8377;{props.offer_cost}</Badge>
          <Badge variant="dark" className="mx-1" style={{textDecoration:'line-through'}}>&#8377;{props.original_cost}</Badge>
        </Card.Title>
      
        
        <Badge className="" style={{background:"white",color:'red',fontSize:'25px',fontWeight:'bolder'}}>
        {props.off}% OFF
        </Badge>
        </div>
      </Card.Body>
      <Card.Footer 
      style={{
        height:'40px',
        color:'red',
        fontFamily:'monospace',
        fontWeight:'bolder'
      }}
      >
        Validity till {props.end} 
      </Card.Footer>
  </Card>
    )
}

export default card
