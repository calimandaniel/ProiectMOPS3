import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/recordlist.css"
import Navbar from "./navbar";
const Record = (props) => (
  
 <tr>
 
  
   <td>{props.record.name}</td>
   <td>{props.record.title}</td>
   <td>{props.record.description}</td>
  <td>{props.record.content}</td>
   <td>
     {/* <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | */}
     {/* <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button> */}
   </td>
 </tr>
);

export default function RecordList() {

// const handleChange = (e) => {
//   setFilterValue(e.target.value);
//   console.log(e.target.value);

// }; 
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
    
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
   
    // const recordsaux=records.filter(records => { return records.firstname.includes({filtervalue})});

     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList(filter) {
  
  const recordsaux=records.filter(records => { return records.name.includes(filtervalue)});
  // if(filtervalue=="")
  // console.log("true")
  // else console.log(false);
   return recordsaux.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 const [filtervalue, setFilterValue] = useState(""); 
 // This following section will display the table with the records of individuals.
 return (
   <div classname="recordlistdiv">
     <h3>Record List</h3>
     <label >Name</label>
         <input
           type="text"
           className="form-control"
           id="name3"
          value={filtervalue}
          onChange={(e) => {setFilterValue( e.target.value );}}
         />
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>

           <th>Name</th>
           <th>Title</th>
           <th>Description</th>
           <th>Content</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
