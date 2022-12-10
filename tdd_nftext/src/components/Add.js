import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from 'react-router-dom'

const Add = () => {

    return (
        <div className='Add'>
            <Card className="my-auto text-center" >
                <Card.Body className="card-body">
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda fuga itaque minus rerum error voluptatum recusandae necessitatibus sequi consectetur in, aut dicta dolor unde soluta maxime dolores libero impedit placeat porro labore, odio explicabo, dolore vero culpa. Veritatis possimus explicabo recusandae ex eaque fugit iste quo libero! Sapiente, eius consequuntur.
                    </Card.Text>
                    <Link to='/add'>
                        <Button variant="primary">
                            Get Started
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );


}

export default Add;