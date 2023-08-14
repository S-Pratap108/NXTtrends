import './index.css'

const FiltersGroup = props => {
  const {
    searchInput,
    categoryOptions,
    ratingsList,
    changeCategory,
    changeRating,
    changeInputValue,
    searchAsInput,
  } = props

  const onChangingInput = event => changeInputValue(event.target.value)

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      return searchAsInput(event.target.value)
    }
    return ''
  }

  const onSelectingCategory = event => changeCategory(event.target.value)
  const onChoosingRating = event => changeRating(event.target.value)

  const onClearFilter = event => {
    changeCategory(event.target.value)
    changeRating(event.target.value)
    changeInputValue(event.target.value)
  }
  return (
    <div className="filters-group-container">
      <input
        type="search"
        value={searchInput}
        onChange={onChangingInput}
        onKeyPress={onKeyPress}
        className="search-input"
        placeholder="search"
      />
      <div className="category-container">
        <h1> Category </h1>
        {categoryOptions.map(eachCategory => (
          <li className="btn-cont" key={eachCategory.categoryId}>
            <p>
              <button
                type="button"
                className="btn"
                value={eachCategory.categoryId}
                onClick={onSelectingCategory}
              >
                {eachCategory.name}
              </button>
            </p>
          </li>
        ))}
      </div>
      <div className="ratings-container">
        <h1> Rating </h1>
        {ratingsList.map(eachRating => (
          <li className="btn-cont" key={eachRating.ratingId}>
            <button
              type="button"
              className="btn"
              value={eachRating.ratingId}
              onClick={onChoosingRating}
            >
              <img
                src={eachRating.imageUrl}
                className="rating-img"
                alt={`rating ${eachRating.ratingId}`}
              />
              <p> & up </p>
            </button>
          </li>
        ))}
      </div>
      <button
        type="button"
        className="clear-btn"
        value=""
        onClick={onClearFilter}
      >
        Clear Filters
      </button>
      {/* Replace this element with your code */}
    </div>
  )
}

export default FiltersGroup
