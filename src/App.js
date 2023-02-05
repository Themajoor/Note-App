import { useState } from "react";
import "./App.css";
import Note from "./Notes";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const addNote = () => {
    setNotes([
      ...notes,
      { id: Math.random() * 1000, title: noteTitle, content: noteContent },
    ]);
    setNoteContent("");
    setNoteTitle("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  return (
    <div className={darkMode ? "App-dark" : "App"}>
      <div className="container">
        <div className="header">
          <h1 className={darkMode ? "h1-dark" : ""}>Notes</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={darkMode ? "toggler-dark" : "toggler"}
          >
            Toggle Theme
          </button>
        </div>
        <div className="search-bar">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="search notes..."
          />
        </div>
        <div className="note-area">
          {notes
            .filter((note) => {
              if (searchTerm === "") {
                return note;
              } else if (note.title.toLowerCase().includes(searchTerm)) {
                return note;
              } else {
                return "";
              }
            })
            .map((item, index) => (
              <Note key={index} item={item} deleteNote={deleteNote} />
            ))}
          <div className="add-note">
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              type="text"
              placeholder="Title..."
            />
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Content..."
            />
            <button onClick={addNote}>Add Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
