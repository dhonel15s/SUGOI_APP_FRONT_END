// IMPORT: DEPENDENCIES
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP
import {Container, Card, Button, Row, Col} from "react-bootstrap";



// PRODUCT VIEW FUNCTION MAIN --------------------------------------------------------------
export default function CourseView(){

	// DECLARE VARIABLE STORING THE PRODUCT ID FROM PARAMS (URL)
	const { productId } = useParams();

	// USE NAVIGATE TO GO TO OTHER PAGE
	const navigate = useNavigate();

	// SET INITIAL VALUE TO NAME, DESC AND PRICE
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stock, setStock] = useState(0);
	const [price, setPrice] = useState(0);

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE
	useEffect(()=>{

		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
		.then(response => response.json())
		.then(data => {
			// PASS FETCHED DATA TO VARIABLES
			setName(data.details.name);
			setDescription(data.details.description);
			setStock(data.details.stocks);
			setPrice(data.details.price);
		});

	}, [productId])


	// PRODUCT VIEW FUNCTIONS -----------------------------------------------------------------
	const addToCart = (productId) =>{

		fetch(`${ process.env.REACT_APP_API_URL }/users/addToCart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(response => response.json())
		.then(data => {

			if(data.status){
				Swal.fire({
					title: "Added to Cart",
					icon: "success",
					text: "You have successfully added this item in your cart."
				});

				navigate("/products");
			}
			else{
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});
			}

		});

	}

	// PRODUCT VIEW MAIN DESIGN------------------------------------------------------------------
	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body className="text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Card.Subtitle>Available stocks:</Card.Subtitle>
							<Card.Text>{stocks}</Card.Text>
							<Button variant="primary"  size="lg" onClick={() => addToCart(productId)}>Enroll</Button>
						</Card.Body>		
					</Card>
				</Col>
			</Row>
		</Container>
	)
}