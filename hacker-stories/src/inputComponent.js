import React, { useEffect, useRef } from "react";

const Input = ({ id, children, type, identifier, input, isFocused }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="inputs">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        onChange={input}
        value={identifier}
        autoFocus={isFocused}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
