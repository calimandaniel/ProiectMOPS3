import React, { Component } from "react";
import { Button, Card, Form as RForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { buildMetadata, createIPFSUrl, submitFileToPinata, submitJsonToPinata } from "../client/pinata";
import contract from "../contracts/NFTEXT.json";
import { StyledNavLink } from "./StyledComponents";
import { add } from "./Add.test.helper";
import "../css/add.css";
import "../css/home.css";

const web3 = createAlchemyWeb3("https://eth-goerli.g.alchemy.com/v2/LveuRfwE6yaOfl8T-MiseeTMSe1vJo4m");
const contractAddress = "0x28C946fd826c9D7EAfb18F7f59992113CB65A485";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

export function Connect() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return "unavailable";

  if (status === "notConnected")
    return (
      <div className="">
        <button onClick={connect}>Connect to MetaMask</button>
      </div>
    );

  if (status === "connecting") return "Connecting";

  if (status === "connected") return "Connected";
  return null;
}

const Add = () => {
  const { status, connect, account } = useMetaMask();

  const [file, setFile] = useState();
  const [fileContent, setFileContent] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const onDrop = useCallback((acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setFieldValue("file", file.name);
    setFile(file);

    console.log("======FILE====");
    console.log(file);
    console.log("==============");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async function (e) {
      const modified = reader.result.split("base64,")[1];
      console.log(modified);
      setFileContent(modified);
    };
  }, []);

  const formik = useFormik({
    initialValues: { name: "", title: "", description: "", file: "" },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.title) {
        errors.title = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      if (!values.file) {
        errors.file = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(`Submiting file to pinata.`);
      const fileRes = await submitFileToPinata(file);
      setLoading(`File submited successfully. Submiting metadata to pinata.`);

      const fileIpfsHash = fileRes.data.IpfsHash;
      const metadata = buildMetadata(values.name, values.title, values.description, createIPFSUrl(fileIpfsHash));

      const metadataRes = await submitJsonToPinata(metadata, `${values.name} - ${values.title}`);

      setLoading(`Metadata submited successfully. Minting your NFT !`);

      const metadataIpfsHash = metadataRes.data.IpfsHash;
      const tokenURI = `ipfs://${metadataIpfsHash}`;
      const nonce = await web3.eth.getTransactionCount(account, "latest");
      //the transaction
      const tx = {
        from: account,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(account, tokenURI).encodeABI(),
      };

      web3.eth.sendTransaction(tx, function (err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
          setLoading(`The hash of your transaction is: ${hash} \nCheck Goerli Scan to view the status of your transaction!`);
          
          add(values.name, values.title, values.description, createIPFSUrl(fileIpfsHash));
        } else {
          setError("Something went wrong when submitting your transaction. Try again!");
          console.log("Something went wrong when submitting your transaction:", err);
        }
      });
    },
  });

  if (status === "initializing") return <div className="">Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div className="">MetaMask not available :(</div>;

  if (status === "notConnected")
    return (
      <div className="">
        <button id="metaButton" onClick={connect}>Connect to MetaMask</button>
      </div>
    );

  if (status === "connecting") return <div className="">Connecting...</div>;

  return (
    <div>
      <div>
        <p className="text-monospace content-align-center form-title"></p>
      </div>
      <div className="container">
        {error ? (
          <>
            <div className="d-block">
              <p className="text-danger">{error}</p>
              <StyledNavLink className="navlink d-block" href="add">
                Retry
              </StyledNavLink>
            </div>
          </>
        ) : loading ? (
          loading
        ) : (
          <RForm onSubmit={formik.handleSubmit} className="w-75 d-flex flex-column justify-content-center align-items-center">
            <RForm.Group className="mb-3 w-50" controlId="name">
              <RForm.Control type="text" placeholder="Enter the name" value={formik.values.name} onChange={formik.handleChange} className="mb-2" />
              <RForm.Text id="name" style={{ color: "red" }}>
                {formik.errors.name}
              </RForm.Text>
            </RForm.Group>
            <RForm.Group className="mb-3 w-50" controlId="title">
              <RForm.Control
                type="textarea"
                name="title"
                placeholder="Enter the document title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="mb-2"
              />
              <RForm.Text id="title" style={{ color: "red" }}>
                {formik.errors.title}
              </RForm.Text>
            </RForm.Group>

            <RForm.Group className="mb-3 w-50" controlId="description">
              <RForm.Control
                type="text"
                name="description"
                placeholder="Enter description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="mb-2"
              />
              <RForm.Text id="description" style={{ color: "red" }}>
                {formik.errors.description}
              </RForm.Text>
            </RForm.Group>
            <Dropzone
              onDrop={(acceptedFiles) => onDrop(acceptedFiles, formik.setFieldValue)}
              accept={{
                "text/plain": [".txt"],
                "application/pdf": [".pdf"],
              }}
              maxFiles={1}
            />
            <RForm.Text id="description" style={{ color: "red" }}>
              {formik.errors.file}
            </RForm.Text>
            <Button variant="primary" type="submit" className="mt-3" style={{ "margin-top": "40px" }}>
              Create nft
            </Button>
          </RForm>
        )}
      </div>
    </div>
  );
};

export default Add;
