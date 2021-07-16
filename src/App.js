import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import SortableTable from './SortableTable';


const SortingDirection = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
  UNSORTED: 'UNSORTED',
};


/**
 * Implement the fetchData method to make an api call to the url
 * Use the use effect hook to make the api call
 * https://randomuser.me/api/?results=30
 */

const fetchData = () => {
 
};

const flattenLocation = (location) => {
  const data = [];
  for (const { street, timezone, coordinates, ...rest } of location) {
    data.push({
      ...rest,
      number: street.number,
      name: street.name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  }
  const getAllKeys = getAllHeaders(data[0]);
  return { headers: getAllKeys, data };
  // console.log('the result is ', result);
};

const getAllHeaders = (data) => {
  console.log(' Object.keys', Object.keys(data));
  return Object.keys(data);
  // return Object.keys(data).reduce((key, value) => {});
};

const sortData = (dataToBeSorted, sortKey, direction) => {
  dataToBeSorted.sort((a, b) => {
    const relA = a[sortKey];
    const relB = b[sortKey];
    if (
      direction === SortingDirection.UNSORTED ||
      direction === SortingDirection.ASCENDING
    ) {
      if (relA < relB) return -1;
      if (relA > relB) return 1;
      return 0;
    } else {
      if (relA > relB) return -1;
      if (relA < relB) return 1;
      return 0;
    }
  });
};

const getNextSortingDirection = (sortingDirection) => {
  if (
    sortingDirection === SortingDirection.UNSORTED ||
    sortingDirection === SortingDirection.ASCENDING
  ) {
    return SortingDirection.DESCENDING;
  }
  return SortingDirection.ASCENDING;
};

function App() {
  // const [people, setPeople] = useState([]);
  const [location, setAllLocation] = useState({
    headers: [],
    data: [],
  });

  const [sortingDireection, setSortingDirection] = useState({});

  const sortColumn = (sortKey) => {
    const newFlattenedList = {
      ...location,
      data: [...location.data],
    };
    const currentSortingDirection = sortingDireection[sortKey];
    sortData(newFlattenedList.data, sortKey, currentSortingDirection);
    const nextSortingDirection = getNextSortingDirection(
      currentSortingDirection
    );

    const newSortingDirection = { ...sortingDireection };
    newSortingDirection[sortKey] = nextSortingDirection;

    setAllLocation(newFlattenedList);
    setSortingDirection(newSortingDirection);
  };

  useEffect(() => {
    // Make an api call here
  }, []);
  return (
    <div className="App">
      <h1> Lets Start Coding</h1>
      <SortableTable
        headers={location.headers}
        tableData={location.data}
        sortColumn={sortColumn}
      />
    </div>
  );
}

export default App;