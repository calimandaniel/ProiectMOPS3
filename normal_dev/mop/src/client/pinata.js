
import axios from "axios"

const submitFileURL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const submitJSONURL = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
const nftImageUrl = "https://ipfs.io/ipfs/QmVhEFHZnhSVrpmNQkR99dzDdEQghfXACTohKDVk3MNKg4";

export const submitFileToPinata = async (file) => {
  let formData = new FormData();
  formData.append("file", file);

  console.log("Submiting to pinata");
  
  const res = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
        'pinata_api_key': "9939b6c8fbc1994a8119",
        'pinata_secret_api_key': "1d8f464965898d2f6dcc3f4077052248f0b89cbb84196bd21ad564c30a83fda0",
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