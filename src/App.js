import React, { useEffect, useState } from 'react';
import axios from 'axios';
import users from "./data.json"
import './App.css';
import { restElement } from '@babel/types';


const filteredLocations = users.results.map(({location}) => {
  const { street, timezone, coordinates, ...rest } = location;
  return {
    ...rest,
    number: street.number,
    name: street.name,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  }
})

const getAllHeaders = (data) => {
  console.log(' Object.keys', Object.keys(data));
  return Object.keys(data);
  // return Object.keys(data).reduce((key, value) => {});
};
/**
 * 
 * Create a Table Component And move the Table logic to the New Component
 * Pass data to the component as props
 * Pass the sort column as a prop to the new table
 */


function App() {
  const allHeaders = getAllHeaders(filteredLocations[0])
  const [locations, setAllLocation] = useState({
    headers: allHeaders,
    data: filteredLocations,
  });

  const sortColumn = (sortKey) => {
    console.log(sortKey)
  }

  
  return (
    <div className="App">
      <h1> Lets Start Coding</h1>
      <table>
      <thead>
          <tr>
            {locations.headers.map((each, eachKey) => (
              <th key={eachKey} onClick={() => sortColumn(each)}>
                {each}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {locations.data.map((eachLoc, eachLocIndex) => (
            <tr key={eachLocIndex}>
              {locations.headers.map((header, headerInd) => (
                <td key={headerInd}>{eachLoc[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
