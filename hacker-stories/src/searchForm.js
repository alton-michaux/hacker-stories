import Input from "./inputComponent"
import SearchButton from "./buttonComponent"

const SearchForm = ({ handleEvent, identifiers, inputs, list, className, ids }) => {
	return (
		<form onSubmit={handleEvent()}>
			<aside className={className}>
				<Input
					id={ids[0]}
					type="text"
					isFocused
					identifier={identifiers[0]}
					input={inputs[0]}
				>
					<strong>Genre: </strong>
				</Input>

				<Input
					id={ids[1]}
					type="text"
					isFocused
					identifier={identifiers[1]}
					input={inputs[1]}
				>
					<strong>Year: </strong>
				</Input>
			</aside>

			<aside className="button-div">
				<SearchButton
					type="submit"
					identifier={identifiers[0]}
					loading={list.isLoading}
				>Search</SearchButton>
			</aside>
		</form>
	)
}

export default SearchForm