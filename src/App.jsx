import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [person, setPerson] = useState([]);
  useEffect(() => {
    async function getData() {
      const meta = await fetch("https://dummyjson.com/users");
      const response = await meta.json();
      setPerson(response.users);
    }
    getData();
  }, []);
  return (
    <>
      <pre>there will be table</pre>
      <table>
        <thead>
          <tr>
            <td>firstName</td>
            <td>lastName</td>
            <td>address</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody>
          {person.map((per) => (
            <tr key={per.id}>
              <td>{per.firstName}</td>
              <td>{per.lastName}</td>
              <td>{per.address.address}</td>
              <td>{per.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
