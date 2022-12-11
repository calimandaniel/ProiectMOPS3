import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../css/home.css"
import CryptoImg from '../assets/images/crypto.png'
import { Link } from 'react-router-dom'




const Home = () => {

    return (
        <div className='home'>
            <Image className="img-fluid" src={CryptoImg} rounded />
            <Card className="my-auto text-center" >
                <Card.Body className="card-body">
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text style={{"margin-left":"10px"}}>
                        Mint your document in decentralized blockchain network.
                    </Card.Text>
                    <Link to='/add'>
                        <Button variant="primary" style={{"margin-left":"10px"}}>
                            Get Started
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );


}

export default Home;
