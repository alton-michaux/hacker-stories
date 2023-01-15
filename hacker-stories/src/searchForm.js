import Input from "./inputComponent"
import SearchButton from "./buttonComponent"

const SearchForm = ({handleEvent, inputIDs, handleInputs, list}) => {
	return (
		<form onSubmit={handleEvent}>
			<div className="input-div">
				<Input
					id="genre"
					type="text"
					isFocused
					identifier={inputIDs[0]}
					input={handleInputs[0]}
				>
					<strong>Genre: </strong>
				</Input>

				<Input
					id="year"
					type="text"
					isFocused
					identifier={inputIDs[1]}
					input={handleInputs[1]}
				>
					<strong>Year: </strong>
				</Input>
			</div>

			<div className="search-button-div">
				<SearchButton
					identifier={inputIDs[0]}
					loading={list.isLoading}
				>Search</SearchButton>
			</div>
		</form>
	)
}

export default SearchForm