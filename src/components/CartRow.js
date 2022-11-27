// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";


// IMPORT: BOOTSTRAP ELEMENTS
import { Row, Col, Accordion, ButtonGroup, Button, Form, Image } from 'react-bootstrap';




// CART ROW MAIN FUNCTION  ---------------------------------------
export default function CartRow({cartItemProp}) {
	
	const { productId, productName, productPrice, productImageLink, productDescription, quantity, addedOn, subtotal, stocks, isActive } = cartItemProp;
	const [ itemQuantity, setItemQuantity] = useState(quantity);

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/users/carts/update`, {
			method: "PUT",
			headers:{
			    "Content-Type": "application/json"
			},
			// PASS INPUT EMAIL & PASSWORD AND CONVERT TO JSON FORMAT
			body: JSON.stringify({
			    userId : sessionStorage.getItem("id"),
			    productId : productId,
			    quantity : itemQuantity
			})
		})
		.then(response => response.json())
		.then(data => {})
	}, [itemQuantity]);


	const removeFromCart = () => {
		fetch(`${ process.env.REACT_APP_API_URL }/users/carts/removefromcart`, {
		    method: "PUT",
		    headers: {
		        "Content-Type": "application/json",
		        Authorization: `Bearer ${ sessionStorage.getItem('token') }`
		    },
		    body: JSON.stringify({
		    	userId: sessionStorage.getItem('id'),
		        productId: productId
		    })
		})
		.then(response => response.json())
		.then(data => {
			if(data.status){
			    Swal.fire({
			        title: "Removed from cart!",
			        icon: "success",
			        text: data.message
			    });

			}
			else{
			    Swal.fire({
			        title: "Something went wrong",
			        icon: "error",
			        text: data.message
			    });
			}

		})
	}

	// CART ROW MAIN DESIGN ---------------------------------------
	return (
		<Accordion.Item eventKey={productId}>
			<Accordion.Header>
				<Col>
					{productName}
				</Col>
				<Col className="ps-3 d-flex">
					<Form.Control
					type="number"
					min="1"
					value={itemQuantity}
					onChange={(event) => setItemQuantity(event.target.value)}/>
				</Col>
				<Col className="ps-2">
					Php {productPrice}
				</Col>
				<Col className="ps-2">
					Php {subtotal}
				</Col>
			</Accordion.Header>
			<Accordion.Body className="d-flex">
				<Col xs={4}>
			    	<Image src={productImageLink} fluid width="100" className="rounded shadow-sm"/>
				</Col>
				<Col xs={8} className="ps-2">
					<p>{productDescription}</p>
					<Button
					className="rounded-pill px-3 py-2 remove-item-from-cart-button"
					size="sm"
					onClick={(event) => removeFromCart()}
					>
					Remove item
					</Button>
				</Col>
			</Accordion.Body>
		</Accordion.Item>		        
	)

	
    
}