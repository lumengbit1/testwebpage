import React, { Component } from 'react';
import logo from './logo.svg';
import './Organization.css';
import ITree from './Tree';
import ISlide from './Slider'
import {Grid,Row,Col} from 'react-bootstrap';
import INav from './Nav';


class Organization extends Component {


    render() {

        return (
            <div className='body'>
                <Grid fluid={true}>
                    <Row className="head"><p>head</p></Row>
                    <Row className="nav"><INav /></Row>
                    <Row className="show-grid">
                        <Col className='treecol' md={4} >
                            <ITree/>
                        </Col>
                        <Col className='centre' md={6}>
                            <ISlide/>
                        </Col>
                        <Col className='right' md={2}>
                            <p>right</p>
                        </Col>
                    </Row>
                    <Row className="foot"><p>foot</p></Row>
                </Grid>
            </div>

        )


    }
}

export default Organization;