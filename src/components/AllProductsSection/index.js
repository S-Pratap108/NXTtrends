import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const currentStatus = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  inProgress: 'LOADING',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    pageView: currentStatus.inProgress,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  renderFailureView = () => (
    <div className="failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-img"
      />
      <h1> Oops! Something Went Wrong </h1>
      <p>
        We are having some trouble while processing your request \n please try
        again!
      </p>
    </div>
  )

  getProducts = async () => {
    this.setState({
      pageView: currentStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategoryId,
      activeRatingId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        pageView: currentStatus.successView,
      })
    } else if (response.ok !== true) {
      this.setState({pageView: currentStatus.failureView})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  changeRating = activeRatingId => {
    console.log(activeRatingId)
    this.setState({activeRatingId}, this.getProducts)
  }

  changeInputValue = value => {
    this.setState({searchInput: value})
  }

  searchAsInput = value => {
    this.setState({searchInput: value}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    console.log(productsList)

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        {productsList.length === 0 ? (
          <div className="no-products">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              className="no-product-img"
              alt="no products"
            />
            <h1>No products </h1>
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  activePageView = () => {
    const {pageView} = this.state

    switch (pageView) {
      case currentStatus.successView:
        return this.renderProductsList()
      case currentStatus.failureView:
        return this.renderFailureView()
      case currentStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
  // TODO: Add failure view

  render() {
    const {searchInput} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeInputValue={this.changeInputValue}
          searchAsInput={this.searchAsInput}
        />

        {this.activePageView()}
      </div>
    )
  }
}

export default AllProductsSection
