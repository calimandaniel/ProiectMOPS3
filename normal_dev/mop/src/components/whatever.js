import React, { useState ,useCallback} from "react";
import { useNavigate } from "react-router";
import { useMetaMask } from "metamask-react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { buildMetadata, createIPFSUrl, submitFileToPinata, submitJsonToPinata } from "../client/pinata";
import contract from "../artifacts/contracts/myNFT.sol/MyNFT.json"
import Dropzone from "./Dropzone";
import { useFormik } from "formik";
const web3 = createAlchemyWeb3("https://eth-goerli.g.alchemy.com/v2/g3uhTGdFvNvve-SboDUD6fEMu9XVKCPS");
const contractAddress = "0xE437CDbdd42e025311d0E92FD1866c07D1507c4B";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);//TBD my own contractadress and contract abi

export default function Create() {
  
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
 const [form, setForm] = useState({
   firstname: "",
   lastname: "",
   content: "",
   description:"",
   title:""
 });
 const { status, connect, account, chainId, ethereum } = useMetaMask();
 const navigate = useNavigate();
 const [textValue, setTextValue] = useState("");
 let fileRes;
 const handleChange = async(e) => {
  // 
 
   const file = e.target.files[0];

   let reader = new FileReader();
    fileRes = e.target.files[0];

   reader.onload = (e) => {
     const file = e.target.result;
     console.log(file);
     setTextValue(file);
     updateForm({ content: file})
     
   };

   reader.onerror = (e) => alert(e.target.error.name);
   reader.readAsText(file);
  //  submitFileToPinata(file);
 
};
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
  fileRes=await submitFileToPinata(fileRes);
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
    
    alert(newPerson.content);
   await fetch("http://localhost:5000/record/add", {
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
   alert(`File submited successfully. Submiting metadata to pinata.`);
  
   const fileIpfsHash = fileRes.data.IpfsHash;
   const metadata = buildMetadata(form.firstname, form.lastname,form.title, form.description, form.content, createIPFSUrl(fileIpfsHash));
 
   const metadataRes = await submitJsonToPinata(metadata, `${newPerson.firstname} - ${newPerson.title}`);
 
   alert(`Metadata submited successfully. Minting your NFT !`);
 
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
       alert(`The hash of your transaction is: ${hash} \nCheck Goerli Scan to view the status of your transaction!`);
     } else {
       alert("Something went wrong when submitting your transaction. Try again!");
       console.log("Something went wrong when submitting your transaction:", err);
     }
   });
 
   setForm({ firstname: "", lastname: "", content: "" ,description:"",title:""});
   navigate("/recordlist");
 }
 
//  onSubmit: async (values) => {
//   const fileRes = await submitFileToPinata(file);
//   setLoading(`File submited successfully. Submiting metadata to pinata.`);

//   const fileIpfsHash = fileRes.data.IpfsHash;
//   const metadata = buildMetadata(values.name, values.title, values.description, createIPFSUrl(fileIpfsHash));

//   const metadataRes = await submitJsonToPinata(metadata, `${values.name} - ${values.title}`);

//   setLoading(`Metadata submited successfully. Minting your NFT !`);

//   const metadataIpfsHash = metadataRes.data.IpfsHash;
//   const tokenURI = `ipfs://${metadataIpfsHash}`;
//   const nonce = await web3.eth.getTransactionCount(account, "latest");
//   //the transaction
//   const tx = {
//     from: account,
//     to: contractAddress,
//     nonce: nonce,
//     gas: 500000,
//     data: nftContract.methods.mintNFT(account, tokenURI).encodeABI(),
//   };

//   web3.eth.sendTransaction(tx, function (err, hash) {
//     if (!err) {
//       console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
//       setLoading(`The hash of your transaction is: ${hash} \nCheck Goerli Scan to view the status of your transaction!`);
//     } else {
//       setError("Something went wrong when submitting your transaction. Try again!");
//       console.log("Something went wrong when submitting your transaction:", err);
//     }
//   });
//   add(values.name, values.title, values.description, createIPFSUrl(fileIpfsHash));
// }
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.firstname}
           onChange={(e) => updateForm({ firstname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Last name</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.lastname}
           onChange={(e) => updateForm({ lastname: e.target.value })}
         />
       </div>
       <div className="form-group">
       <label htmlFor="name">Content</label>
       <br/>
         {/* <!--default html file upload button--> */}
         <Dropzone
              onDrop={(acceptedFiles) => onDrop(acceptedFiles, formik.setFieldValue)}
              accept={{
                "text/plain": [".txt"],
                "application/pdf": [".pdf"],
              }}
              maxFiles={1}
            />
       </div>
       <div className="form-group">
       <label htmlFor="name">Description</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
       <label htmlFor="name">Title</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}aaaaaaaaaaaaaaa