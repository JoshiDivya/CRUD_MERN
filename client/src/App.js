import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("divi");
  const [age, setAge] = useState(30);
  const [position, setPosition] = useState("dev");
  const [country, setCountry] = useState("Fin");
  const [salary, setSalary] = useState(3000);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await Axios.get("http://localhost:3001/users");
      setUsers(res.data);
    }
    fetchUsers();
  });

  function saveData() {
    Axios.post("http://localhost:3001/insert", {
      userName: name,
      age: age,
      position: position,
      country: country,
      salary: salary,
    });
  }

  function deleteUser(id) {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  function updateUserInfo(id) {
    console.log(id);
   Axios.put("http://localhost:3001/update",{id: id,newUserName : newUser}) 
  }

  return (
    <div className="App">
      <div className="reg_form_div">
        <label>Name: </label>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <label>Age:</label>
        <input type="number" onChange={(e) => setAge(e.target.value)}></input>
        <label>Country: </label>
        <input type="text" onChange={(e) => setCountry(e.target.value)}></input>
        <label>Position: </label>
        <input
          type="text"
          onChange={(e) => setPosition(e.target.value)}
        ></input>
        <label>Salary : </label>
        <input
          type="number"
          onChange={(e) => setSalary(e.target.value)}
        ></input>
        <button onClick={saveData} type="button">
          Submit
        </button>
      </div>

      {/* set UserData to Table  */}
      <h3>User List</h3>
      <hr/>
      <div style={{display:"flex",flexDirection:"column",width:'50%',margin:'auto',justifySelf:'center',padding:'10px'}}> 
      {users.map((user, index) => {
        return (
          <div style={{border:'1px solid black',marginTop:'10px',width:'70%'}} key={index}>
            <p>{user.userName}</p>{" "}
            <input type='text' onChange={(e)=> setNewUser(e.target.value)} placeholder="enter new name.."></input>
            <button type="submit" onClick={()=>updateUserInfo(user._id)}>Update</button>
            <button className="btn_delete" onClick={()=> deleteUser(user._id)}>Delete</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
