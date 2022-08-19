import React, { useState, useEffect, useDeferredValue } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow_left.svg";
// import useDebounce from './use-debounce';
// import debounce from 'lodash.debounce';

const NotePage = () => {
  let navigate = useNavigate();
  let params = useParams();

  let [note, setNote] = useState([]);

  let [inputText, setInputText] = useState([]);

  const deferredText = useDeferredValue(note)

  // useEffect(() => {
  //   getNote();
  // }, []);

  useEffect(() => {
    // setNote({...note, body: inputText})
    note.body = inputText;
    console.log(note.body);
    updateNote();
  }, [inputText])

  useEffect(() => {
    
    getNote();
    
  }, [note])


  let getNote = async () => {
    if (params.id === "create") return;
    let response = await fetch(`/notes/${params.id}/`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`/notes/${params.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/notes/${params.id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/", { replace: true });
  };

  let createNote = async () => {
    fetch("/notes/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    navigate("/", { replace: true });
  };

   let handleSubmit = () => {
    if (params.id === "create") {
      if (note.body) {
        createNote();
      }
    } else {
      if (note.body) {
        console.log('UPDATED:', note.body);
        updateNote();
        
      } else {
        deleteNote();
      }
    }

    navigate("/", { replace: true });
  };

  let changeHandler = (e) => {
    setInputText(e.target.value);   
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {params.id !== "create" ? (
          <button onClick={deleteNote}>Delete that shit</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={changeHandler}
        defaultValue={note?.body}
      ></textarea>
      <textarea defaultValue={note?.rythm}></textarea>
    </div>
  );
};

export default NotePage;
