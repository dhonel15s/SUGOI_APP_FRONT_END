// IMPORT: DEPENDENCIES
import { useState, useEffect } from "react";

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Accordion } from 'react-bootstrap';

// IMPORT: COMPONENTS
import OrdersRow from "../components/OrdersRow.js";

// ORDERS FUNCTION MAIN --------------------------------------------------------------
export default function Orders() {
	// DECLARE USE STATES
	const [orderRows, setOrderRows] = useState([]);

	// ALL ORDERS --------------------------------------
	useEffect(() =>{

		// FETCH ORDERS
		fetch(`${process.env.REACT_APP_API_URL}/users/myOrders`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ sessionStorage.getItem('token') }`
			}
		})
		.then(response => response.json())
		.then(data => {

			setOrderRows(data.details.map(order =>{
				return(
					<OrdersRow key={order._id} orderItemProp={order}/>
				);
			}));
		})
	}, [orderRows]);

	// ORDERS FUNCTIONS -----------------------------------------------------------------

	

	// ORDERS MAIN DESIGN------------------------------------------------------------------
	
	return (
		<>
		<Container>
		<h6 className="modify-form-title d-inline-block mt-4 pb-1">Orders</h6>
		<Accordion className="shadow-sm">
		    {orderRows}
		</Accordion>
		</Container>
		</>
	)
}