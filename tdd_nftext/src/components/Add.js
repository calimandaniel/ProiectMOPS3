import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useMetaMask } from "metamask-react";

export function Connect() {
    
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return "unavailable"

    if (status === "notConnected")
    return (
      <div className="">
        <button onClick={connect}>Connect to MetaMask</button>
      </div>
    );

    if (status === "connecting") return "Connecting"

    if (status === "connected") return "Connected"
    return null;
}


export async function add(name, title, description, text) {
        // // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { name:name, position:title, level:description };
      
        const response = await fetch("http://localhost:5000/record/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        const {insertedId} = response.data;
        return insertedId;
}

//export default Add;