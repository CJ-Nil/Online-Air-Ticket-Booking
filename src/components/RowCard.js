import React,{useState} from 'react'
import {Row,Col,Badge, Button,Modal} from 'react-bootstrap'
import BookModal from './BookModal'
function RowCard({air,dtime,atime,original_cost,offer_cost,offer,id}) {
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
        <Row className="rounded text-white p-3 px-3 mx-0 my-3" 
        style={{fontFamily:'sans-serif',fontWeight:'bolder',height:'55px', border: '1px solid #BFBFBF',
        boxShadow: '2px 0px 2px 5px #999'
    }}
        >
            <Col xs ><Badge pill variant="info" className="p-2 px-3 center">{air}</Badge></Col>
            <Col xs><Badge pill variant="success" className="p-2 px-3 center">{dtime}</Badge></Col>
            <Col xs><Badge pill variant="primary" className="p-2 px-3 center">{atime}</Badge></Col>
            <Col xs><Badge pill variant="danger" className="p-2 px-3 center">
                {offer!==0?<div><div style ={{fontWeight:'bolder'}} className="lead">&#8377;{offer_cost} </div><div style ={{textDecoration:'line-through'}}>&#8377;{original_cost}</div> </div>:
                <div className="lead">&#8377;{original_cost}</div>
                }
            </Badge>
            </Col>
            <Col xs>
            <Button className="p-2 px-3 center" variant="warning" 
            id={id}
            onClick={bookHandler}
            >
                Book
            </Button>
            </Col>
            <Modal show={modalOpen} onHide={closeModal} >
                <BookModal closeModal={closeModal} id={tid} />
            </Modal>
        </Row>
    )
}
export default RowCard
