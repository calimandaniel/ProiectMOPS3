import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../css/metamask.css"
import CryptoImg from '../assets/images/crypto.png'
import { Link } from 'react-router-dom'


import { useMetaMask } from "metamask-react";

function Metamask() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") return (
        <div>
        <p>Connected account {account} on chain ID {chainId}</p>
        <Link to='/create'>
                        <Button variant="primary">
                            Go to add document
                        </Button>
                    </Link>
    </div>
)

    return null;
}

export default Metamask;