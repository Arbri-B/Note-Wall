import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "./Api";

const DisplayOne = (props) => {

    const [note, setNote] = useState([{}])
    const { id } = useParams();

    useEffect(() => {
        api.get(`/note/${id}`) 
        .then((res) => {
            setNote(res.data.note);
        })
        .catch((err) => {
            console.log(err);
            })
    }, [])


    return (
        <div >
            <div className="dashboard-header">
                <div className="dashboard-header-left">
                    <h2>Note info </h2>
                    <p>read in detail</p>
                </div>
                <Link className="write-new-button" to="/">Go back home</Link>
            </div>
            {
                <div className="card-body d-flex justify-content-evenly">


                    <div className="single-view">
                        <h4 className="card-title">{note.title}</h4>
                        <p className="card-text">{note.body}</p>
                        <p className="card-text">Value: {note.value}</p>
                    </div>

                    <Link className="result-edit" to={`/notes/edit/${note._id}`}> Edit</Link>


                </div>
            }
        </div>





    )
}
export default DisplayOne;
