import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button, Table,Modal} from 'react-bootstrap'
import {getSessionCookie} from './Session'
import EditModal from './EditModal'
function OfferTable({dataArray,setDataArray}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [offId,setOffId] = useState()
    function closeModal(){
        setModalOpen(false)
    }
    const sessionid = getSessionCookie()
    const d={id:sessionid}
    let index = 0;
    const [offData,setOffData] = useState([])
    useEffect(()=>{
        setOffData(dataArray)
        axios.post("http://localhost:8080/on-air-mvc/AdminOffer",d)
        .then(response =>{
            const data = response.data
            setDataArray(data)
            setOffData(data)
        })
        .catch(error =>{
            console.log(error)
        })
    },[])
    function editHandler(e){
        setOffId(e.target.id)
        setModalOpen(true);
    }
    function deleteHandler(e){
        const offerid=e.target.id;
        const sd = {session:sessionid,offerid:offerid}
        axios.post("http://localhost:8080/on-air-mvc/DeleteOffer",sd)
        .then(response =>{
            const data = response.data
            setDataArray(data)
            setOffData(data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <div style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'1rem',background:'white',color:'burlywood'}}>
        <Table striped bordered hover responsive size="sm" className="text-success" >
            <thead>
                <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Offer(%)</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    offData.map((el) => {
                        return(<tr key={index}>
                            <td>{index++}</td>
                            <td>{el.from_city}</td>
                            <td>{el.to_city}</td>
                            <td>{el.offer}</td>
                            <td>{el.start}</td>
                            <td>{el.end}</td>
                            <td><Button id={el.off_id} variant="outline-warning" onClick={editHandler}>Edit</Button></td>
                            <td><Button id={el.off_id} variant="outline-danger" 
                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(e) } }
                            >Delete</Button></td>
                        </tr>)
                    })
                }
                
            </tbody>
        </Table>
        <Modal show={modalOpen} onHide={closeModal} >
            <EditModal closeModal={closeModal} id={offId} setOffData={setOffData} />
        </Modal>
        </div>
    )
}

export default OfferTable
