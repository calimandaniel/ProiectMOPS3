import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   firstname: "",
   lastname: "",
   description: "",
   content:"",
   title:"",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     firstname: form.firstname,
     lastname: form.lastname,
     content: form.content,
     title:form.title,
     description:form.description

   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">First Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.firstname}
           onChange={(e) => updateForm({ firstname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Last name: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.lastname}
           onChange={(e) => updateForm({ lastname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Description:</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Content: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.content}
           onChange={(e) => updateForm({ content: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Title: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}