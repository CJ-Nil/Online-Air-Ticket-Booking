import React,{useState} from 'react'
import {Nav,Tab} from 'react-bootstrap'
import OfferAdd from './OfferAdd'
import OfferTable from './OfferTable'
function OfferPanel(props) {
    const [dataArray,setDataArray]=useState([])
    return (
        <>
        <Tab.Container defaultActiveKey="2">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="2">Offer Table</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1">Add Offer</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content style={{borderLeft:'1px solid #f0f0f0',height:'100%'}}>
                <Tab.Pane eventKey="1">
                    <OfferAdd  dataArray={dataArray} setDataArray={setDataArray} />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                    <OfferTable  dataArray={dataArray} setDataArray={setDataArray} />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        
        </>
    )
}

export default OfferPanel
