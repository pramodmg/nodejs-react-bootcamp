import React from 'react';

const SortableTable = (props) => {
  const { headers, sortColumn, tableData } = props
  return (
    <table>
      <thead>
        <tr>
        {headers.map((each, eachKey) => (
            <th key={eachKey} onClick={() => sortColumn(each)}>
              {each}
            </th>
          ))}
        </tr>
     
      </thead>

      <tbody>
      {tableData.map((eachLoc, eachLocIndex) => (
          <tr key={eachLocIndex}>
            {headers.map((header, headerInd) => (
              <td key={headerInd}>{eachLoc[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableTable