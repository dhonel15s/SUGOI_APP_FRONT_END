// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// IMPORT: BOOTSTRAP ELEMENTS
import { Container, Table, Row, Col, Button, Accordion, Card, ListGroup, Form } from 'react-bootstrap';

// IMPORT: COMPONENTS
import CartRow from "../components/CartRow.js";

// IMPORT: CSS
import "./styles/Cart.css";

// CART FUNCTION MAIN --------------------------------------------------------------
export default function Cart() {

	// DECLARE USE STATES
	const [cartRows, setCartRows] = useState([]);
	const [cartItemCount, setCartItemCount] = useState(0);
	const [cartTotalAmount, setCartTotalAmount] = useState(0);
	const [deliveryAddress, setDeliveryAddress] = useState('');
	const [deliveryMode, setDeliveryMode] = useState('Standard Delivery');
	const [deliveryFee, setDeliveryFee] = useState(60);
	const [paymentMode, setPaymentMode] = useState('E-Wallet');
	const [orderTotal, setOrderTotal] = useState(deliveryFee);

	const [cartItems, setCartItems] = useState([]);

	// SUBMIT BUTTON DEFAULT VALUE
	const [isActive, setIsActive] = useState(false);

	// USED FOR NAVIGATING TO OTHER PAGE
	const navigate = useNavigate();

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

			setCartItemCount(data.details[0].products.length);
			setCartTotalAmount(data.details[0].totalAmount);
			setOrderTotal(data.details[0].totalAmount+deliveryFee);

			setCartItems(data.details[0].products.map(cartItem => cartItem))
			// DISPLAY EACH PRODUCTS
			setCartRows(data.details[0].products.map(cartItem =>{
				return(
					<CartRow key={cartItem.productId} cartItemProp={cartItem}/>
				);
			}));
		})
	}, [cartRows]);

	useEffect(() => {
		if (deliveryMode === "Standard Delivery") {
			setDeliveryFee(60);
		}else if(deliveryMode === "Express Delivery"){
			setDeliveryFee(100);
		}else {
			setDeliveryFee(0);
		}
	}, [deliveryMode])


	useEffect(() => {

	    if(deliveryAddress === '' || cartItemCount === 0 ){
	        setIsActive(false);
	    }else{
	        setIsActive(true);
	    }

	}, [deliveryAddress]);

	// CART FUNCTIONS -----------------------------------------------------------------
	const checkoutOrder = () => {
		fetch(`${ process.env.REACT_APP_API_URL }/users/checkout`, {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/json",
				        Authorization: `Bearer ${ sessionStorage.getItem('token') }`
				    },
				    body: JSON.stringify({
				    	itemCount: cartItemCount,
				    	deliveryAddress: deliveryAddress,
				    	deliveryMode: deliveryMode,
				    	deliveryFee: deliveryFee,
				    	paymentMode: paymentMode,
				    	totalAmount: orderTotal,
				    	products: cartItems
				    })
				})
				.then(response => response.json())
				.then(data => {
				
					if(data.status){
						
						clearCart();

					    Swal.fire({
					        title: "Order successful!",
					        icon: "success",
					        text: "Thank you for your order."
					    });

					    navigate(`/users/orders`);

					}
					else{
					    Swal.fire({
					        title: "Something went wrong.",
					        icon: "error",
					        text: data.message
					    });
					}

				})
	}

	const clearCart = () => {
		fetch(`${ process.env.REACT_APP_API_URL }/users/carts/clearcart`, {
				    method: "DELETE",
				    headers: {
				        "Content-Type": "application/json",
				        Authorization: `Bearer ${ sessionStorage.getItem('token') }`
				    }
				})
				.then(response => response.json())
				.then(data => {})
	}


	// CART MAIN DESIGN------------------------------------------------------------------
	return (
		<Container className="mt-5 d-md-flex">
			<Container className="mt-2">
				<h6 className="modify-form-title pb-2">Food Cart</h6>
				<Accordion>
					<Container className="border d-flex p-2 text-white accordion-header">
							<Col className="ps-2">
								Name
							</Col>
							<Col>
								Quantity
							</Col>
							<Col>
								Price
							</Col>
							<Col>
								Subtotal
							</Col>
					</Container>	
				     {cartRows}
				    <Container className="border d-flex p-2 text-white accordion-header">
				    		<Col className="ps-2 cart-total-amount">
				    			Total: Php {cartTotalAmount}
				    		</Col>
				    </Container>
				</Accordion>
			</Container>

			<Container className="mt-2">
				<h6 className="modify-form-title pb-2">Order Summary</h6>
					<Card className="my-3">
				        <Card.Body className="p-0 m-0">
				            <ListGroup className="list-group-flush">
				              <ListGroup.Item className="d-flex">
				                    <p className="m-0 product-card-subtitle">Item count:</p>
				                    <p className="ms-auto m-0 product-card-text">{cartItemCount}</p>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex">
				                    <p className="m-0 product-card-subtitle">Items total:</p>
				                    <p className="ms-auto m-0 product-card-text">Php {cartTotalAmount}</p>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex">
				              		<p className="m-0 product-card-subtitle">Delivery address:</p>
				              		<Form.Control className="rounded-pill product-card-text" as="textarea"  rows={1} onChange={(event) => setDeliveryAddress(event.target.value)} required/>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex">
				              		<p className="m-0 product-card-subtitle">Delivery mode:</p>
				              		<Form.Select className="rounded-pill product-card-text" value={deliveryMode} onChange={(event)=> setDeliveryMode(event.target.value)}>
				              		      <option value="Standard Delivery">Standard Delivery</option>
				              		      <option value="Express Delivery">Express Delivery</option>
				              		      <option value="For Pickup">For Pickup</option>
				              		 </Form.Select>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex">
				                    <p className="m-0 product-card-subtitle">Delivery fee:</p>
				                    <p className="ms-auto m-0 product-card-text">Php {deliveryFee}</p>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex">
				              		<p className="m-0 product-card-subtitle">Payment mode:</p>
				              		<Form.Select className="rounded-pill product-card-text" value={paymentMode} onChange={(event)=> setPaymentMode(event.target.value)}>
				              		      <option value="E-Wallet">E-Wallet</option>
				              		      <option value="Credit Card">Credit Card</option>
				              		      <option value="Cash on Delivery">Cash on Delivery</option>
				              		 </Form.Select>
				              </ListGroup.Item>
				              <ListGroup.Item className="d-flex order-total">
				                    <p className="m-0 product-card-subtitle text-white">Order Total:</p>
				                    <p className="ms-auto m-0 text-white">Php {orderTotal}</p>
				              </ListGroup.Item>
				            </ListGroup>
				        </Card.Body>

				        <Card.Footer className="d-flex justify-content-end">
				        {
				        	isActive ?
				        		<Button className="all-products-modify-submit shadow-sm p-2 px-3 cart-total-amount" onClick={(event)=>checkoutOrder()}>Checkout</Button>
				        	:
				        		<Button className="all-products-modify-submit shadow-sm p-2 px-3 cart-total-amount" disabled>Checkout</Button>
				        }
				        </Card.Footer>
				    </Card>
			</Container>
		</Container>
	)
}