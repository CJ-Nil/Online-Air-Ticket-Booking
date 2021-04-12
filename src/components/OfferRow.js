import React,{useState} from 'react'
import {Row,Col,Badge,Button,Modal} from 'react-bootstrap'
import BookModal from './BookModal'
function OfferRow({id,a_time,d_time,from,to,off,originalCost,offerCost,start,end}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [tid,setTid] = useState()
    function closeModal(){
        setModalOpen(false)
    }
    function bookHandler(e){
        setTid(e.target.id)
        setModalOpen(true);
    }
    return (
        <>
        <Row className="rounded text-white pr-5 mx-0 my-3" 
        style={{fontFamily:'sans-serif',fontWeight:'bolder',height:'55px', border: '1px solid #BFBFBF',
        boxShadow: '2px 0px 2px 5px #999', width:'100%'
    }}
        >
            <Col xs ><Badge pill variant="info" className="p-2 px-3 center">{from}</Badge></Col>
           { <span style={{position:'relative',color:'#ffa500',fontSize:'20px'}}>&#9992;</span>}
            <Col xs><Badge pill variant="success" className="p-2 px-3 center">{to}</Badge></Col>
            <Col xs><Badge pill variant="success" className="p-2 px-3 center ">{d_time.toString().split(".")[0]}</Badge></Col>
            <Col xs><Badge pill variant="success" className="p-2 px-3 center">{a_time.toString().split(".")[0]}</Badge></Col>
            <Col xs><Badge pill variant="danger" className="p-2 px-3 center">{off+"%"}</Badge></Col>
            <Col xs><Badge pill variant="primary" className="p-2 px-3 center ">
               <div style ={{fontWeight:'bolder'}} className="lead">&#8377;{offerCost} </div>
               <div style ={{textDecoration:'line-through'}}>&#8377;{originalCost}</div> 
            </Badge>
            </Col>
            <Col xs><Badge pill variant="warning" className="p-2 ml-3 mr-5 center">{start.toString().split(".")[0]}</Badge></Col>
            <Col xs><Badge pill variant="danger" className="p-2 ml-5 mr-0 center">{end.toString().split(".")[0]}</Badge></Col>
            <Col xs>
            <Button className="p-2 ml-5 center" variant="warning"  id = {id}
            onClick={bookHandler}
            >
                Book
            </Button>
            </Col>
        </Row>
        <Modal show={modalOpen} onHide={closeModal} >
        <BookModal closeModal={closeModal} id={tid} />
        </Modal>
        </>
    )
}

export default OfferRow
