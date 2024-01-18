import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = (props) => {
    const { noteList, setNoteList } = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/notes")
            .then((res) => {
                setNoteList(res.data.notes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="dashboard-main">
            <div className="dashboard-header">
                <div className="dashboard-header-left">
                    <h2>Note Wall </h2>
                    <p>leave a note</p>
                </div>
                <Link className="write-new-button" to="/notes/new">
                    Write a note
                </Link>
            </div>
            <div className="resultDiv">
                {noteList.length > 0 ? (
                    noteList.map((note, index) => (
                        <div
                            className="results"
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? "grey" : "white",
                            }}
                        >
                            <div>
                                <h4
                                    style={{
                                        color: note.value === 10 ? "red" : "inherit",
                                    }}
                                >
                                    {note.title}
                                </h4>
                                <p>{note.body}</p>
                                <p>Value {note.value}</p>
                            </div>
                            <Link className="result-edit" to={`/notes/${note._id}`}>
                                Edit
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>There are no notes!</p>
                        <Link to="/notes/new">Create One</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
