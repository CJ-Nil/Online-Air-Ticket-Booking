import React from 'react'
import {Nav,Tab,} from 'react-bootstrap'
import AddFlight from './AddFlight'
import FlightsTable from './FlightsTable'
function FlightsPanel() {
    return (
        <Tab.Container defaultActiveKey="2">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="2">Flights Table</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1">Add Flights</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content style={{borderLeft:'1px solid #f0f0f0',height:'100%'}}>
                <Tab.Pane eventKey="1">
                <AddFlight  />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                <FlightsTable ></FlightsTable>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    )
}

export default FlightsPanel
