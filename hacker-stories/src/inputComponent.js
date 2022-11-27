import React from "react";

const Input = ({ id, children, type, identifier, inputAction }) => (
  <div>
    <label htmlFor={id}>{children}</label>
    <input id={id} type={type} onChange={inputAction} value={identifier} />
  </div>
);

export default Input;
