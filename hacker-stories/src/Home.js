
import Input from "./inputComponent";
import SearchButton from "./buttonComponent";
import Items from "./items";
import SearchForm from "./searchForm";

const Home = ({
	genre,
	year,
	list,
	handleGenreInput,
	handleYearInput,
	handleSearchAction,
	searchTerm,
	handleSearchInput,
	handleRemoveItem,
	filteredEntries,
	handleSaveList
}) => {
	return (
		<main style={{ textAlign: "center" }} className="main-div">
			<section className="info-div">
				<h1 className="headline">{genre} Movies {year}</h1>
				<SearchForm
					identifiers={[genre, year]}
					inputs={[handleGenreInput, handleYearInput]}
					handleEvent={handleSearchAction}
					list={list}
					className="input-div"
					ids={["genre", "year"]}
				></SearchForm>

				<hr className="divider" />

				<aside className="search-save-div">
					<Input
						id="search"
						type="text"
						isFocused
						identifier={searchTerm}
						input={handleSearchInput}
					>
						<strong>Search: </strong>
					</Input>

					<SearchButton
						identifier={filteredEntries}
						inputAction={handleSaveList}
					>Save List</SearchButton>
				</aside>
			</section>

			<section className="list-div">
				{list.isError && <p>Something went wrong...</p>}

				{list.isBlank && <p>No data.</p>}

				{list.isLoading ? (
					<p> Loading... </p>
				) : (
					<Items list={filteredEntries} onRemoveItem={handleRemoveItem} />
				)
				}
			</section>
		</main>
	)
}

export default Home
