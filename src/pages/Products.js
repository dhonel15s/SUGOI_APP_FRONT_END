// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";

// IMPORT: BOOTSTRAP ELEMENTS
import { Row, Image } from 'react-bootstrap';

// IMPORT: CSS
import "./styles/Products.css";

// IMPORT: COMPONENTS
import ProductCard from "../components/ProductCard";


// PRODUCTS FUNCTION MAIN --------------------------------------------------------------
export default function Products() {

	// DECLARE USE STATES
	const [products, setProducts] = useState([]); 

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/products/active`)
		.then(response => response.json())
		.then(data => {
			// DISPLAY EACH PRODUCTS
			setProducts(data.productList.map(product =>{				
					return(
						<ProductCard key={product._id} productProp={product}/>
					);
			}));
		})
	}, []);

	// PRODUCTS MAIN DESIGN------------------------------------------------------------------
	return(
		<>
			<Image src={require('../assets/logo.jpg')} width="40" className="d-block m-auto"/>
			<h1 className="text-center products-title">Menu</h1>
			<Row>{products}</Row>
		</>
	)
}