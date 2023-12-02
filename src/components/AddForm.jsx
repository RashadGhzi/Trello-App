import React from "react";
import "./addForm.css"
export default function AddForm(props) {
  const { hanldeAddForm, title, setTitle, setEditMode } = props.context;
  return (
    <form method="post" className="add-form" onSubmit={hanldeAddForm}>
      <textarea
        name="title"
        id=""
        cols="30"
        rows="1"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></textarea>
      <div className="buttons"><button type="submit">add</button> <button type="button" onClick={()=>{ setEditMode(null) }}>cancel</button></div>
    </form>
  );
}
