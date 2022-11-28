import React, { useEffect, useRef } from "react";

const Input = ({ id, children, type, identifier, inputAction, isFocused }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        onChange={inputAction}
        value={identifier}
        autoFocus={isFocused}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
