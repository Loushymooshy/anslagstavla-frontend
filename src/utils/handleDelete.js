// src/utils/handleDelete.js
const handleDelete = (index, messages, setMessages) => {
  const newMessages = messages.filter((_, i) => i !== index);
  setMessages(newMessages);
};

export { handleDelete };