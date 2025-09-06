
import React from "react";

export default function Card({ title, value, children }){
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      {children}
    </div>
  );
}
