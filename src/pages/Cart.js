// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Table, Row, Col, Button } from 'react-bootstrap';

// IMPORT: COMPONENTS
import CartRow from "../components/CartRow.js";

// CART FUNCTION MAIN --------------------------------------------------------------
export default function Cart() {

	// DECLARE USE STATES
	const [cartRows, setCartRows] = useState([]);
	const [cartItemCount, setCartItemCount] = useState(0);
	let cartItems = [];
	
	// ALL PRODUCTS IN CART --------------------------------------
	useEffect(() =>{

		// FETCH USERS CART ITEMS
		fetch(`${process.env.REACT_APP_API_URL}/users/viewcart`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ sessionStorage.getItem('token') }`
			}
		})
		.then(response => response.json())
		.then(data => {

			setCartItemCount(data.details[0].products.length)

			for(let x = 0; x < data.details[0].products.length; x++) {
				cartItems.push(data.details[0].products[x].productName)
			}
			console.log(cartItems)
			// DISPLAY EACH PRODUCTS
			setCartRows(data.details[0].products.map(cartItem =>{
				return(
					<CartRow key={cartItem.productId} cartItemProp={cartItem}/>
				);
			}));
		})
	}, []);

	// CART FUNCTIONS -----------------------------------------------------------------


	// CART MAIN DESIGN------------------------------------------------------------------
	return (
		<Container className="mt-5">
			<Row>
				<Col xs={8} className="p-2 shadow-sm border rounded">
					<h3 className="modify-form-title pb-2">Food Cart</h3>
					<Table bordered hover className="shadow-sm p-0 m-0 text-white">
						<thead className="product-table-header">
					    	<tr>
					    	  <th>Product Details</th>
					    	  <th>Quantity</th>
					    	  <th>Price</th>
					    	  <th>Subtotal</th>
					    	</tr>
					    </thead>
					      
					    <tbody>
					    	{cartRows}
					    </tbody>
					</Table>
				</Col>

				<Col xs={3} offset={1}  className="p-2 shadow-sm border rounded ms-4">
					<h3 className="modify-form-title pb-2">Order Summary</h3>
					<Row>
						<Col>
							<p className="d-inline">Items in Cart: </p>
							<p className="d-inline"><strong>{cartItemCount}</strong></p>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<p className="d-inline">Delivery Address: </p>
							<p className="d-inline"><strong>{cartItemCount}</strong></p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p className="d-inline">Shipping Option: </p>
							<p className="d-inline"><strong>{cartItemCount}</strong></p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p className="d-inline">Payment Option: </p>
							<p className="d-inline"><strong>{cartItemCount}</strong></p>
						</Col>
					</Row>
					<Row>
						<Col>
							<p className="d-inline">Total Payment: </p>
							<p className="d-inline"><strong>{cartItemCount}</strong></p>
						</Col>
					</Row>
					<Button className="banner-button p-2 px-5 mt-5 shadow">Checkout</Button>
				</Col>
			</Row>
		</Container>
	)
}