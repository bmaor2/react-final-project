import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext"

export const HomePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {useSetCurrentUserId} = useContext(UserContext);
    const setCurrentUserId = useSetCurrentUserId


    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name==="password"){
            setPassword(value);
        }
        if(name==="username"){
            setUsername(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let user = {
            username: username,
            password: password
        }
        checkIfUserExists(user);
    }
    
    const checkIfUserExists = async (userObj) => {
        let data = await fetch("https://jsonplaceholder.typicode.com/users")
        let users = await data.json();
        for (let user of users) {
          if (user.username === userObj.username && (user.address.zipcode.split("-")[1]) === userObj.password) {
            localStorage.setItem("currentUser", JSON.stringify(user.name))
            setCurrentUserId(user);
            navigate(`/users/${user.id}`);
            return;
          }
        }
        alert("user does not exist");
      }


    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="User Name"
                />
                <br />

                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button>Submit</button>
            </form>
        </main>
    );
}