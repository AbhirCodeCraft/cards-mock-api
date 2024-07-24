import React, { useEffect, useState } from "react";
import { getAllItems, removeItem } from "./modules/ApiHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const data = await getAllItems();
      setCards(data);
    }

    fetchItems();
  }, []);

  const handleAddItem = () => {
    setShowModal(true);
  };

  const handleRemoveItem = async (name) => {
    await removeItem(name);
    setCards(cards.filter((item) => item.name !== name));
  };

  const handleModalClose = async (newMember) => {
    if (typeof newMember == "object") {
      setCards([...cards, newMember]);
    }
    setShowModal(false);
  };

  return (
    <div className="pageWrapper">
      <div className="header">
        <h1>99th precinct roster</h1>
        <button onClick={handleAddItem}>Add new</button>
      </div>
      <div className="listWrapper">
        <TransitionGroup className="groupWrapper">
          {cards.map((item) => (
            <CSSTransition key={item.name} timeout={500} classNames="card">
              <div className="card">
                <div className="container">
                  <h2>
                    <b>{item.name}</b>
                  </h2>
                  <div className="iconWrapper">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="deleteIcon"
                      onClick={() => handleRemoveItem(item.name)}
                    />
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Modal isOpen={showModal} onClose={handleModalClose} />
    </div>
  );
}

export default App;
