import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext"
 

export const UserPageLayout = () => {
    const name = JSON.parse(localStorage.getItem("currentUser"))
    const { currentUser } = useContext(UserContext);

    return (
        
        <div className="navBar">
            <h1>Wellcome: {name}</h1>
            <NavLink to='logout' > Logout </NavLink>
            <br />
            <NavLink to='info' > Info </NavLink> 
            <br />
            <NavLink to='todos' >  Todos </NavLink>
            <br />
            <NavLink to='albums' > Albums </NavLink>
            <br />
            <NavLink to='posts' > Posts </NavLink>
            <br />
            <Outlet />
        </div>

    )
}































//  const UserPage = () => {
//     const { currentUser } = useContext(UserContext);
//     const [user, setUser] = useState([])

//     const madeAnArrayCurrentUser = (currentUser) => {
//         let tempArrayOfUser = [];
//         for (let key in currentUser) {
//             tempArrayOfUser.push(currentUser[key])
//         }
//         setUser(tempArrayOfUser)
//     }

//     return (
//         <>
//             {user.map((key, index) => <p key={index}>{key.toString()}</p>)}
//             <button onClick={() => madeAnArrayCurrentUser(currentUser)}>info</button>
//         </>
//     )
// }