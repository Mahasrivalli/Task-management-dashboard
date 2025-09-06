
import React from "react";

export default function Table({ columns, data, rowHref }){
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(c => <th key={c.key}>{c.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row._id || row.id} onClick={() => rowHref && (window.location.href = rowHref(row))} style={{cursor: rowHref ? "pointer" : "default"}}>
            {columns.map(c => <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
