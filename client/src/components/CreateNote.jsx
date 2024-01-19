import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "./Api";
import '../App.css';

const Form = () => {
    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: "",
        body: "",
        value: 0
    });

    const [errorMessage, setErrorMessage] = useState("");

    const navigateBack = () => {
        navigate(-1);
    };

    const isFormValid = () => {
        return !(note.title.length >= 2 &&
            note.body.length <= 25 &&
            note.value >= 1 &&
            note.value <= 10 &&
            note.title !== "test" &&
            note.body !== "test");
    };

    const createNote = (e) => {
        e.preventDefault();

        if (note.title.length < 2 || note.body.length > 25 || note.value < 1 || note.value > 10) {
            setErrorMessage('Your form has some unsolved issues!');
        } else {
            api.post('notes', note)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setNote({
                        title: "",
                        body: "",
                        value: 0
                    });
                })
                .catch(err => {
                    setErrorMessage("Your API has some problems!");
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <div className="dashboard-header">
                <div className="dashboard-header-left">
                    <h2 className="text-center p-2">Create a note</h2>
                    <p>leave a note</p>
                </div>
                <Link className="write-new-button" to="/">Go back home</Link>
            </div>
            <div className="form px-3">
                <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>

                {
                    errorMessage ?
                        <p className="red text-center">{errorMessage}</p> :
                        null
                }

                <form className="w-75 m-auto" onSubmit={(e) => createNote(e)}>
                    <div>
                        <label className="form-label">Title: </label>
                        <input className="form-control" type="text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Enter the title" />
                    </div>
                    {note.title.length > 0 && note.title.length < 2 ?
                        <p className="red">The title should be 2 characters or more</p> :
                        null
                    }
                    {note.title === "test" ?
                        <p className="red">The title can not be just test!</p> :
                        null
                    }
                    <div>
                        <label className="form-label">Body: </label>
                        <input className="form-control" type="text" value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} placeholder="What do you want to write?" />
                    </div>
                    {note.body.length > 25 ?
                        <p className="red">The note can not be longer than 25 characters</p> :
                        null
                    }
                    {note.body === "test" ?
                        <p className="red">The note body can not be just test!</p> :
                        null
                    }

                    <div>
                        <label className="form-label">Value: </label>
                        <input className="form-control" type="number" value={note.value} onChange={(e) => setNote({ ...note, value: e.target.value })} />
                    </div>
                    {note.value < 1 || note.value > 10 ?
                        <p className="red">The value must be between 1 and 10</p> :
                        null
                    }

                    <button className="btn btn-success mt-2" disabled={isFormValid()}>Create Note</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
