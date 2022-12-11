import { client } from "./config";
import axios from "axios"

const submitFileURL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const submitJSONURL = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
const nftImageUrl = "https://ipfs.io/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH";

export const submitFileToPinata = async (file) => {
  let formData = new FormData();
  formData.append("file", file);

  console.log("Submiting to pinata");
  
  const res = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
        'pinata_api_key': "b76941803c8c507660e6",
        'pinata_secret_api_key': "449ee1cc8e2df19c363da928039f271d9fffe6398039156954539cbed23824a9",
        "Content-Type": "multipart/form-data"
    },
});

  return res;
};

export const buildMetadata = (ownerName, assetTitle, assetDescription, contentUrl) => {
  return {
    name: assetTitle,
    description: assetDescription,
    image: nftImageUrl,
    attributes: [
      {
        trait_type: "Owner's name",
        value: ownerName,
      },
      {
        trait_type: "Link to resource",
        value: contentUrl,
      },
    ],
  };
};

export const createIPFSUrl = (hash) => `https://ipfs.io/ipfs/${hash}`;

export const submitJsonToPinata = async (metadata, documentNameOnPinata) => {
  console.log("Submiting metadata to pinata");
  var data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
        name: documentNameOnPinata,
      },
    "pinataContent": metadata,
  });

  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      'Content-Type': 'application/json', 
      'pinata_api_key': "b76941803c8c507660e6",
      'pinata_secret_api_key': "449ee1cc8e2df19c363da928039f271d9fffe6398039156954539cbed23824a9"
    },
    data : data
  };
  
  const res = await axios(config);
  return res;
};