import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PenVector from './assets/pen-vector.svg';
import BinIcon from './assets/bin-icon.svg';
import EditIcon from './assets/edit-icon.svg';
import { updateMessage } from './api';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateMessage({text: message, id: editId})
      .then(() => getMessages().then((data) => setMessages(data)));
      } else {
        createMessage({ text: message, username })
        .then(() => getMessages().then((data) => setMessages(data)));
      }

      setMessage('');
      setUsername('');
      setShowForm(false);
      setIsEditMode(false);
      setEditId(null);
};
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/message/${id}`, {
      method: 'DELETE',
    }).then(() => getMessages().then((data) => setMessages(data)));
  };

  const handleEdit = (msg) => {
    setMessage(msg.text);
    setUsername(msg.username);
    setShowForm(true);
    setIsEditMode(true);
    setEditId(msg.id);
  };

  const handleSortByDate = () => {
    const sortedMessages = messages.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setMessages([...sortedMessages]);
  };

  const createMessage = (message) => {
    console.log(API_BASE_URL);
    console.log(message);
    return fetch(`${API_BASE_URL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then((response) => response.json());

  };

  const updateMessage = (message) => {
    return fetch(`${API_BASE_URL}/updateMessage`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then((response) => response.json());
  };


  const getMessages = async () => {
    const response = await fetch(`${API_BASE_URL}/getMessages`);
    return await response.json();
  }

  useEffect(() => {
    getMessages().then((data) => setMessages(data));
  }, []);

  return (
    <div className="App">
      <div className={`content ${showForm || messages.length === 0 ? 'centered-content' : ''}`}>
      {!showForm && messages.length === 0 && (
        <h1>Du har inga meddelanden att visa</h1>
      )}

      {messages.length > 0 && (
          <button onClick={handleSortByDate} className="sort-button">Sortera</button>
      )}
      {!showForm && messages.map((msg, index) => (
        <div key={index} className="message-card">
          <p>{msg.text}</p>
          <p className='username'><strong> ─ {msg.username}</strong></p>
          <img
          src={BinIcon}
          alt="Delete"
          className="delete-icon"
          onClick={() => handleDelete(msg.id)}
        />
        <img 
        src={EditIcon}
        alt="Edit"
        className="edit-icon"
        onClick={() => handleEdit(msg)}
        />
        </div>
      ))}
      {showForm ? (
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Skriv ditt meddelande här..."
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Användarnamn"
          />
          <button type="submit" className="submit-button">Publicera</button>
        </form>
      ) : (
        <button className="write-button" onClick={() => setShowForm(true)}>
          <img src={PenVector} alt="Pen Icon" />
        </button>
      )}
      </div>
    </div>
  );
}

export default App;



