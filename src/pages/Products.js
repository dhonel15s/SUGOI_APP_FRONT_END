// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";

// IMPORT: BOOTSTRAP ELEMENTS
import { Row, Col, Image, DropdownButton, Dropdown } from 'react-bootstrap';

// IMPORT: CSS
import "./styles/Products.css";

// IMPORT: COMPONENTS
import ProductCard from "../components/ProductCard";


// PRODUCTS FUNCTION MAIN --------------------------------------------------------------
export default function Products() {

	// DECLARE USE STATES
	const [products, setProducts] = useState([]); 
	const [selectedCategory, setSelectedCategory] = useState('All Products');

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/products/active`)
		.then(response => response.json())
		.then(data => {
			// DISPLAY EACH PRODUCTS
			setProducts(data.productList.map(product =>{

			if (selectedCategory === 'All Products') {
				if(product.stocks > 0){
					return(
							<ProductCard key={product._id} productProp={product}/>
						);
				}
					
				
			}else {
				console.log(selectedCategory)
				console.log(product.stocks > 0)
				console.log(product.category === selectedCategory)
				console.log(product.category)
				console.log(selectedCategory)
				if(product.stocks > 0){
					if(product.category === selectedCategory){
						return(
							<ProductCard key={product._id} productProp={product}/>
						);
					}
					
				}	
			}
					
					
			}));
		})
	}, [selectedCategory]);

	// PRODUCTS MAIN DESIGN------------------------------------------------------------------
	return(
		<>
			<Image src={require('../assets/logo.jpg')} width="40" className="d-block m-auto"/>
			<h1 className="text-center products-title">Menu</h1>
			<Row>
			<Col className="d-flex flex-row">
				<DropdownButton id="dropdown-basic-button" title="Menu" >
					<Dropdown.Item onClick={(e)=> setSelectedCategory('All Products')}>All Products</Dropdown.Item>
					<Dropdown.Item onClick={(e)=> setSelectedCategory('Rice Meals')}>Rice Meals</Dropdown.Item>
				    <Dropdown.Item onClick={(e)=> setSelectedCategory('Noodles')}>Noodles</Dropdown.Item>
				    <Dropdown.Item onClick={(e)=> setSelectedCategory('Sides')}>Sides</Dropdown.Item>
				    <Dropdown.Item onClick={(e)=> setSelectedCategory('Drinks')}>Drinks</Dropdown.Item>
				    <Dropdown.Item onClick={(e)=> setSelectedCategory('Desserts')}>Desserts</Dropdown.Item>
				</DropdownButton>
				<p className="menu-category-indicator my-auto ms-2 pb-1">{selectedCategory}</p>
			</Col>
			</Row>
			<Row className="mb-5">{products}</Row>
		</>
	)
}