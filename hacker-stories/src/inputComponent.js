import React, { useEffect, useRef } from "react";

const Input = ({ id, children, type, identifier, input, inputAction, isFocused }) => {
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
        onChange={input}
        value={identifier}
        autoFocus={isFocused}
        ref={inputRef}
      />
      <button
        className="search-button"
        type="button"
        disabled={!identifier}
        onClick={inputAction}
      > Search
      </button>
    </div>
  );
};

export default Input;
