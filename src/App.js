import React, { useEffect, useState } from 'react';
import axios from 'axios';
import users from "./data.json"
import './App.css';
const filteredLocations = users.results.map(({location}) => location)

/**
 * 
 * Create a Table Component And move the Table logic to the New Component
 * Pass data to the component as props
 */


function App() {
  const [locations, setAllLocation] = useState(filteredLocations);
  return (
    <div className="App">
      <h1> Lets Start Coding</h1>
      <table>
        
        <tbody>
          {locations.map((eachLoc, eachLocIndex) => (
            <tr key={eachLocIndex}>
              <td>{eachLoc.city}</td>
              <td>{eachLoc.state}</td>
              <td>{eachLoc.postcode}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
