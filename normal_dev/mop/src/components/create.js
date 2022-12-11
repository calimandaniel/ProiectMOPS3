import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   firstname: "",
   lastname: "",
   content: "",
   description:"",
   title:""
 });
 
 const navigate = useNavigate();
 const [textValue, setTextValue] = useState("");
 const handleChange = (e) => {
   const file = e.target.files[0];

   let reader = new FileReader();

   reader.onload = (e) => {
     const file = e.target.result;
     console.log(file);
     setTextValue(file);
     updateForm({ content: file})
   };

   reader.onerror = (e) => alert(e.target.error.name);
   reader.readAsText(file);
 };
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
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
 
   setForm({ firstname: "", lastname: "", content: "" ,description:"",title:""});
   navigate("/recordlist");
 }
 
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
<input type="file" id="actual-btn"  onChange={handleChange}/>
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
}