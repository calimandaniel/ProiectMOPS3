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


const Add = () => {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") {

        return <div>Connected</div>
    }

    return null;

}

export default Add;