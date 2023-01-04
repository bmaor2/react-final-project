import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import "../CSS/Todos.css"



export const Todos = () => {
    const { currentUser } = useContext(UserContext);
    const [todos, setTodos] = useState([])
    const [checked, setChecked] = useState([])


    const getAllTodosOfCurrentUserById = async () => {
        let data = await fetch("https://jsonplaceholder.typicode.com/todos")
        let todos = await data.json();
        let temporaryArrayOfTodos = [];
        let temporaryArrayOfchecked = [];
        for (let key of todos) {
            if (key.userId == currentUser.id) {
                temporaryArrayOfTodos.push(key);
                temporaryArrayOfchecked.push(key.completed)
            }
        }
        setChecked(temporaryArrayOfchecked)
        setTodos(temporaryArrayOfTodos);
    }

    useEffect(() => {
        getAllTodosOfCurrentUserById();

    }, [])

    const handleCheck = (event) => {
        const { name } = event.target;
        const checkedVal = event.target.checked;
        let arr = [...checked];
        arr[name] = checkedVal;
        setChecked(arr);
    }
    const createTodosList = (list) => {
            list.sort((a, b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
            });
            console.log(list);
        let mapArray = list.map((obj, index) => <div className='pContainer' >
            <p key={obj.id} className='pCheckBox'> Task number {index + 1}:
                <input onChange={handleCheck} type="checkbox" name={index} key={obj.id} checked={checked[index]} />  {obj.title} <br />
               
            </p>
        </div>
        )
        return mapArray;
    }
    return (
        <>
            <h1>Todos list:</h1>
            <div className="todosDiv">
                {createTodosList(todos)}
            </div>
        </>
    )
}