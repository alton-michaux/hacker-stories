import Input from "./inputComponent"
import Items from "./items"

const ListView = ({ searchTerm, handleSearchInput, list, filteredEntries, handleRemoveItem }) => {
	return (
		<main style={{ textAlign: "center" }} className="main-div">
			<section className="info-div">
				<h1 className="headline"> Your List </h1>
				<Input
					id="search"
					type="text"
					isFocused
					identifier={searchTerm}
					input={handleSearchInput}
				>
					<strong>Search: </strong>
				</Input>
			</section>
			<section className="list-div">
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

export default ListView
