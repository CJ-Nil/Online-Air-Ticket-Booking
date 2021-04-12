import React,{useEffect} from 'react'
import {getSessionCookie} from './Session'
import {Tab,Row,Col,Nav} from 'react-bootstrap'
import OfferPanel from './OfferPanel'
import FlightsPanel from './FlightsPanel'
function AdminPanel(props) {
    useEffect(()=>{
        const session=getSessionCookie();
        if(session===undefined)
        props.history.push("/Login");
    },[props.history])
    return (
        <div style={{height:'690px'}}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1" >
                <Row className="ml-0 mr-2 mb-2" style={{marginTop:'30px',height:'100%'}} >
                    <Col sm={2} style={{height:'100%',padding:'0px'}} className="bg-gradient3">
                        <Nav fill variant="pills" className="flex-column "  >
                            <Nav.Item style={{borderBottom:'1px solid gray'}}>
                            <Nav.Link eventKey="1">Flights Panel</Nav.Link>
                            </Nav.Item >
                            <Nav.Item style={{borderBottom:'1px solid gray'}}>
                            <Nav.Link eventKey="2">Offer Panel</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} style={{height:'100%',paddingLeft:'0px'}}>
                        <Tab.Content style={{borderLeft:'1px solid #f0f0f0',height:'100%'}}>
                            <Tab.Pane eventKey="1">
                            <FlightsPanel/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                            <OfferPanel />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default AdminPanel
