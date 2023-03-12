import { v4 as uuidV4 } from "uuid"
import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Habit() { 
    const [data, setData] = useState([]);
    function getAny() {
        const url = "/habit/test"
        axios
            .get(url)
            .then((res) => {
                setData(JSON.parse(res.data))
                
            }
            )
            .catch((err) => {
                console.error(err)
            })
    
}
    function getWorkout() {
        const url = "/habit/workout"
        axios
            .get(url)
            .then((res) => {
                setData(JSON.parse(res.data))

            }
            )
            .catch((err) => {
                console.error(err)
            })
    }
    function getMeal() {
        const url = "/habit/meal"
        axios
            .get(url)
            .then((res) => {
                setData(JSON.parse(res.data))

            }
            )
            .catch((err) => {
                console.error(err)
            })
    }
    function getBook() {
        const url = "/habit/book"
        axios
            .get(url)
            .then((res) => {
                setData(JSON.parse(res.data))

            }
            )
            .catch((err) => {
                console.error(err)
            })
    }
    
    return (
        <>
            <div className="habit-page journal-page">
            <h1>Habit</h1>
                <p>Choose a healthy habit to follow for the day</p>
                <div className = "habit-buttons journal-buttons">
                    <button id="random" onClick={getAny}>Random</button>
                    <button id="workout" onClick={getWorkout}>Workout</button>
                    <button id="meal" onClick={getMeal}>Meal</button>
                    <button id="book" onClick={getBook}>Book</button>
                </div>
                <div className = "habit">
                <p>{data.Type}</p>
                <p>{data.Description}</p>
                </div>

        </div>
        </>
)}
