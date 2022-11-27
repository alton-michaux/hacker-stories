import React from 'react';

const Input = ({id, label, type, identifier, inputAction}) => (
	<div>
		<label htmlFor={id}>{label}</label>
		<input 
			id={id} 
			type={type}
			onChange={inputAction}
			value={identifier}
		/>
	</div>
)

export default Input;
