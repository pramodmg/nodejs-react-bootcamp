import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// https://randomuser.me/api/?results=20

const SortingDirection = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
  UNSORTED: 'UNSORTED',
};

const fetchData = () => {
  return axios
    .get('https://randomuser.me/api/?results=30')
    .then((res) => {
      let { results } = res.data;
      // console.log('the data is ', results);
      return results;
    })
    .catch((err) => console.error('error occured', err));
};

// type Location = any;

const flattenLocation = (location) => {
  const data = [];
  // street, timezone, coordinates
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

const getFilterdRows = (rows, filterKey) => {
  return rows.filter((row) => {
    return Object.values(row).some((s) =>
      (' ' + s).toLowerCase().includes(filterKey)
    );
  });
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
  const [people, setPeople] = useState([]);
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
    fetchData().then((eachResults) => {
      setPeople(eachResults);
      const ourFlatteredLocation = flattenLocation(
        eachResults.map(({ location }) => location)
      );
      setAllLocation(ourFlatteredLocation);
      console.log('the flattened Array is ', ourFlatteredLocation);
    });
  }, []);
  return (
    <div className="App">
      <h1> Lets Start Coding</h1>
      {/* <table>
        <thead>
          <th>
            1<tr>1</tr>
          </th>
          <th>
            2<tr>2</tr>
          </th>
          <th>
            3<tr>3</tr>
          </th>
        </thead>
      </table> */}
      <table>
        <thead>
          <tr>
            {location.headers.map((each, eachKey) => (
              <th key={eachKey} onClick={() => sortColumn(each)}>
                {each}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getFilterdRows(location.data, '').map((eachLoc, eachLocIndex) => (
            <tr key={eachLocIndex}>
              {location.headers.map((header, headerInd) => (
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
