import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import api from "../../../server/services/apiService";
import '../App.css';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [note, setNote] = useState({
        title: "",
        body: "",
        value: 0
    });

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        api.get(`note/${id}`)
            .then((res) => {
                setNote(res.data.note);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteNote = () => {
        api.delete(`note/${id}`)
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const navigateBack = () => {
        navigate('/');
    }

    const isFormValid = () => {
        return !(note.title.length >= 2 &&
            note.body.length <= 25 &&
            note.value >= 1 &&
            note.value <= 10 &&
            note.title !== "test" &&
            note.body !== "test");
    };

    const editNote = (e) => {
        e.preventDefault();
        if (note.title.length < 2 || note.body.length > 25 || note.value < 1 || note.value > 10) {
            setErrorMessage('Your form has some unsolved issues!');
        } else {
            api.put(`note/${id}`, note)
                .then(() => {
                    console.log('Note updated successfully');
                    setNote({
                        title: "",
                        body: "",
                        value: 0
                    });
                    navigate('/');
                })
                .catch(err => {
                    setErrorMessage("Your API has some problems!");
                    console.log(err);
                });
        }
    }

    return (
        <div>
            <div className="dashboard-header">
                <div className="dashboard-header-left">
                    <h2>Edit note </h2>
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

                <form className="w-75 m-auto" onSubmit={(e) => editNote(e)}>
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
                    <div className="edit-delete-div">
                        <button className="btn btn-success mt-2" disabled={isFormValid()}>Edit Note</button>
                        <button onClick={deleteNote} className="btn btn-danger mt-2">Delete Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;
