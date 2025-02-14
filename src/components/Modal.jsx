import { getData } from "../api";
import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
export default function Modal({ isOpen, isClose, modalValue }) {
  const [modal, setModal] = useState([]);
  useEffect(() => {
    async function PreLoadmodal() {
      const loads = await getData();

      setModal(loads);
    }
    PreLoadmodal();
  }, []);

  ////////////////////////////////////////
  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalwindow = {
    background: "blue",
    padding: "30px",
    borderRadius: "5px",
    width: "500px",
    color: "white",
  };
  ////////////////////////////////////////

  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modalwindow}>
        <h2>Модальное окно</h2>
        <h4>
          Информация о пользователе:
          <p>Имя: {modal[modalValue - 1].firstName}</p>
          <p>Фамилия: {modal[modalValue - 1].lastName}</p>
          <p>Возраст:{modal[modalValue - 1].age}</p>
          <p>Рост: {modal[modalValue - 1].height}</p>
          <p>Вес: {modal[modalValue - 1].weight}</p>
          <p>Адрес: {modal[modalValue - 1].address.address}</p>
          <p>Номер телефона: {modal[modalValue - 1].number}</p>
          <p>Электронная почта: {modal[modalValue - 1].email}</p>
        </h4>
        <button onClick={isClose}>закрыть</button>
      </div>
    </div>
  );
}
/* eslint-enable react/prop-types */
