import React, { Component ,useState} from 'react';
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../css/add.css"
import CryptoImg from '../assets/images/crypto.png'
import { Link } from 'react-router-dom'




const Add = () => {
    

  
    const [textValue, setTextValue] = useState("");
    const handleChange = (e) => {
      const file = e.target.files[0];
  
      let reader = new FileReader();
  
      reader.onload = (e) => {
        const file = e.target.result;
        console.log(file);
        setTextValue(file);
      };
  
      reader.onerror = (e) => alert(e.target.error.name);
      reader.readAsText(file);
    };

    return (
        
        <div class="form">
             <textarea
        cols={30}
        rows={20}
        value={textValue}
        onChange={setTextValue}
        style={{ marginTop: 15, width: "50%" }}
      ></textarea>
        <div class="title">Welcome</div>
        <div class="subtitle">Let's create your account!</div>
        <div class="input-container ic1">
          <input id="firstname" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">Document name</label>
        </div>
        <div class="input-container ic2">
          <input id="lastname" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">Author first name</label>
        </div>
        <div class="input-container ic2">
          <input id="lastname" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">Author last name</label>
        </div>
        
        <div class="input-container ic2">
        {/* <!--default html file upload button--> */}
<input type="file" id="actual-btn" hidden onChange={handleChange}/>

{/* <!--our custom file upload button--> */}
<label class="file_label" for="actual-btn">Choose File</label>
        </div>
        <button type="text" class="submit">submit</button>
      </div>
    );
  };

export default Add;