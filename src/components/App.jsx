// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [person, setPerson] = useState([]);
//   useEffect(() => {
//     async function getData() {
//       const meta = await fetch("https://dummyjson.com/users");
//       const response = await meta.json();
//       setPerson(response.users);
//     }
//     getData();
//   }, []);
//   return (
//     <>
//       <pre>there will be table</pre>
//       <table>
//         <thead>
//           <tr>
//             <td>firstName</td>
//             <td>lastName</td>
//             <td>address</td>
//             <td>email</td>
//           </tr>
//         </thead>
//         <tbody>
//           {person.map((per) => (
//             <tr key={per.id}>
//               <td>{per.firstName}</td>
//               <td>{per.lastName}</td>
//               <td>{per.address.address}</td>
//               <td>{per.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default App;

import { getData } from "../api";
import { useEffect, useState } from "react";
import Modal from "./Modal";
export default function AssetsTable() {
  const [persons, setPersons] = useState([]);
  const [input, setInput] = useState("");
  const [openModal, setOpenmodal] = useState(false);
  const [value, setValue] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "default",
  });

  useEffect(() => {
    async function PreLoadtable() {
      const loads = await getData();

      setPersons(loads);
    }
    PreLoadtable();
  }, []);

  function sortedProducts() {
    let sortableProduct = [...persons];
    if (sortConfig.direction !== "default") {
      sortableProduct.sort((a, b) => {
        if (a[sortConfig.key] <= b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] >= b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProduct;
  }

  function requestSorts(key) {
    let direction = "ascending";
    console.log("direction is", direction);
    console.log("sortConfig.direction is", sortConfig.direction);

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
      console.log("direction is ", direction);
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "default";
      console.log("direction is", direction);
    }
    setSortConfig({ key, direction });
  }

  function getValue(...val) {
    setValue(val);
  }

  function ModalChange() {
    setOpenmodal(true);
  }

  const ModalClose = () => {
    setOpenmodal(false);
  };

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      console.log("ctrl pressed");
      setOpenmodal(false);
    }
  });

  function handleChange(e) {
    setInput(e.target.value);
  }

  const data = sortedProducts().filter(
    (person) =>
      person.firstName.toLowerCase().includes(input.toLowerCase()) ||
      person.lastName.toLowerCase().includes(input.toLowerCase()) ||
      person.gender.toLowerCase().includes(input.toLowerCase()) ||
      person.age === parseFloat(input) ||
      person.address.address.toLowerCase().includes(input.toLowerCase())
  );
  const contentStyle = {
    textAlign: "center",
    minHeight: "calc(100vh)",
    color: "#fff",
    backgroundColor: "#001529",
  };
  return (
    <div style={contentStyle}>
      <input type="text" onChange={handleChange} className="control" />

      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => requestSorts("firstName")}>
                firstName
              </button>
            </th>
            <th>
              <button onClick={() => requestSorts("lastName")}>lastName</button>
            </th>
            <th>
              <button onClick={() => requestSorts("age")}>Age</button>
            </th>
            <th>
              <button onClick={() => requestSorts("gender")}>gender</button>
            </th>
            <th>
              <button onClick={() => requestSorts("address")}>address</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td
                onClick={() => {
                  ModalChange();
                  getValue(item.id);
                }}
              >
                {item.firstName}
              </td>
              <td
                onClick={() => {
                  ModalChange();
                  getValue(item.id);
                }}
              >
                {item.lastName}
              </td>
              <td
                onClick={() => {
                  ModalChange();
                  getValue(item.id);
                }}
              >
                {item.age}
              </td>
              <td
                onClick={() => {
                  ModalChange();
                  getValue(item.id);
                }}
              >
                {item.gender}
              </td>
              <td
                onClick={() => {
                  ModalChange();
                  getValue(item.id);
                }}
              >
                {item.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Modal isOpen={openModal} isClose={ModalClose} modalValue={value} />
      </div>
    </div>
  );
}
