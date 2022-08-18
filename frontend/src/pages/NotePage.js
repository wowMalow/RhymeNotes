import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow_left.svg";

const NotePage = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [note, setNote] = useState([]);

  useEffect(() => {
    getNote();
  });

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

  let handleSubmit = () => {
    if (params.id === "create") {
      if (note.body) {
        createNote();
      }
    } else {
      if (note.body) {
        updateNote();
      } else {
        deleteNote();
      }
    }

    navigate("/", { replace: true });
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
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
