import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([]);

  // console.log("hiiiii")

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchNotes();
      });
  }
  function updateHandler(e, noteId) {
    e.preventDefault();
    const { description } = e.target.elements;
    const updateDescription = description.value

    axios.patch("http://localhost:3000/api/notes/" + noteId, { description : updateDescription }).then((res) => {
      fetchNotes();
    });
  }

  function deleteHandler(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      fetchNotes();
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  deleteHandler(note._id);
                }}
              >
                delete
              </button>
              <form
                onSubmit={(e) => {
                  updateHandler(e, note._id);
                }}
              >
                <input name="description" type="text" placeholder="edit description" />
                <button>edit</button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
