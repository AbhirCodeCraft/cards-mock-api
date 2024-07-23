import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { addItem, getAllItems, removeItem } from './modules/ApiHelpers';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      await handleAddItem();
      await handleRemoveItem(1);
      const data = await getAllItems();
      setItems(data);
    }

    fetchItems();
    /* handleAddItem();
    handleRemoveItem(1); */
  }, []);

  const handleAddItem = async () => {
    const newItem = { name: 'New Item' };
    const addedItem = await addItem(newItem);
    setItems([...items, addedItem]);
  };

  const handleRemoveItem = async (id) => {
    await removeItem(id);
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
