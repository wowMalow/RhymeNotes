import React, { useState, useEffect, useDeb, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow_left.svg";
import useDebounce from '../utils/useDebounce';
// import debounce from 'lodash.debounce';

const NotePage = () => {
  let navigate = useNavigate();
  let params = useParams();

  let [note, setNote] = useState([]);

  let previuos_state_text = useRef("");

  let [inputText, setInputText] = useState([]);

  const debouncedInputText = useDebounce(inputText, 1000);

  // const deferredText = useDeferredValue(note)

  // useEffect(() => {
  //   getNote();
  // }, []);

  useEffect(() => {
    // setNote({...note, body: inputText})
    // previuos_state_text.current = ;
    note.body = debouncedInputText;
    // previuos_state_text = note.body;
    setNote({...note, body: debouncedInputText});
    console.log("INPUT_BODY:", note.body);
    // console.log("INPUT_TEXT:", previuos_state_text.current);
    if (note.body.length !== 0) {
      updateNote();
    }
    
  }, [debouncedInputText]);

  useEffect(() => {
    // console.log("NOTE UP:", note.body);
    // console.log("TEXT UP:", previuos_state_text.current);

    if (previuos_state_text.current !== note.body) {
      console.log("NOTE IF:", note.body);
      // console.log("TEXT IF:", previuos_state_text.current);
      previuos_state_text.current = note.body;
      getNote();
    }
    // console.log("NOTE after:", note.body);
    // console.log("TEXT after:", previuos_state_text.current);
  }, [note.body]);

  let getNote = async () => {
    if (params.id === "create") return;

    let response = await fetch(`/notes/${params.id}/`);
    let data = await response.json();
    setNote(data);
    // console.log("GET SENT");
  };

  let updateNote = async () => {
    fetch(`/notes/${params.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    // console.log("UPDATE SENT");
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
        console.log("UPDATED:", note.body);
        updateNote();
      } else {
        deleteNote();
      }
    }

    navigate("/", { replace: true });
  };

  let changeHandler = (e) => {
    setInputText(e.target.value);
  };

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
      <textarea onChange={changeHandler} defaultValue={note?.body}></textarea>
      <textarea defaultValue={note?.rythm}></textarea>
    </div>
  );
};

export default NotePage;
