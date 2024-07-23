import React, { useEffect, useState } from 'react';
import { getAllItems, addItem, removeItem } from './modules/ApiHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const data = await getAllItems();
      setCards(data);
    }

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    const newItem = { name: 'New Item' };
    const addedItem = await addItem(newItem);
    setCards([...cards, addedItem]);
  };

  const handleRemoveItem = async (id) => {
    await removeItem(id);
    setCards(cards.filter(item => item.id !== id));
  };

  return (
    <div className='pageWrapper'>
      <div className="header">
        <h1>99th precinct roster</h1>
        <button onClick={handleAddItem}>Add new</button>
      </div>
      <div className='listWrapper'>
        <TransitionGroup className='groupWrapper' >
          {cards.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="card">
              <div className="card">
                <div className="container">
                  <h2><b>{item.name}</b></h2>
                  <div className="iconWrapper">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="deleteIcon"
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default App;
