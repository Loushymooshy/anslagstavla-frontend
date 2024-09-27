// src/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL;
export const postMessage = async (message) => {
  const response = await fetch(`${API_BASE_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  return response.json();
};

export const getMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/getMessages`);
  return response.json();
};

export const getMessagesByUsername = async (username) => {
  const response = await fetch(`${API_BASE_URL}/getMessagesByUsername?username=${username}`);
  return response.json();
};

export const updateMessage = async (id, updatedMessage) => {
  const response = await fetch(`${API_BASE_URL}/updateMessage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updatedMessage }),
  });
  return response.json();
};