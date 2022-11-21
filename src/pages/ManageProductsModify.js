// IMPORT: DEPENDENCIES
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP
import {Container, Card, Button, Row, Col, Form, Image} from "react-bootstrap";



// PRODUCT VIEW FUNCTION MAIN --------------------------------------------------------------
export default function ManageProductsModify(){

	let user = {
        token: sessionStorage.getItem("token"),
        id: sessionStorage.getItem("id"),
        isAdmin: sessionStorage.getItem("isAdmin")
      }

	// DECLARE VARIABLE STORING THE PRODUCT ID FROM PARAMS (URL)
	const { productId } = useParams();

	// USE NAVIGATE TO GO TO OTHER PAGE
	const navigate = useNavigate();

	// SET INITIAL VALUE TO FF
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [imageLink, setImageLink] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);

	// ACTIVE FETCHING OF PRODUCT DATA FROM DATABASE
	useEffect(()=>{

		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
		.then(response => response.json())
		.then(data => {
			// PASS FETCHED DATA TO VARIABLES
			setName(data.details.name);
			setCategory(data.details.category);
			setImageLink(data.details.imageLink);
			setDescription(data.details.description);
			setPrice(data.details.price);
			setStocks(data.details.stocks);
		});

	}, [productId])

	// PRODUCT VIEW FUNCTIONS -----------------------------------------------------------------

	function authenticate(event) {
		event.preventDefault();

		if (user.isAdmin === "true") {

			modifyProduct(productId);

		}else{
			// IF NON ADMIN
			Swal.fire({
			    title: "Authentication Failed!",
			    icon: "error",
			    text: "Users are not allowed to perform this action."
			});	
		}

	} 
	const modifyProduct = (productId) =>{

		fetch(`${ process.env.REACT_APP_API_URL }/products/update/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ sessionStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: name,
				category: category,
				imageLink: imageLink,
				description: description,
				price: price,
				stocks: stocks
			})
		})
		.then(response => response.json())
		.then(data => {

			if(data.status){
				Swal.fire({
					title: "Update Success!",
					icon: "success",
					text: `Details of ${name} successfully updated.`
				});

				navigate("/manageproducts");
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
				<Col lg={{ span: 8, offset: 2 }} className="modify-product-main border p-5 shadow-sm">
						<h3 className="modify-form-title pb-2">Modify Product</h3>
			        	<Form onSubmit={(event)=> authenticate(event)}>
			        		<Row>
			        			<Col>
			        			<Form.Group className="mb-3">
			        			  <Form.Label>Product Name</Form.Label>
			        			  <Form.Control className="form-input-all-products-table py-2" type="text" value={name} onChange={(event)=> setName(event.target.value)}/>
			        			</Form.Group>
			        			</Col>

			        			<Col>
			        			<Form.Group className="mb-3">
			        			  <Form.Label>Category</Form.Label>
			        			  <Form.Control className="form-input-all-products-table py-2" type="text" value={category} onChange={(event)=> setCategory(event.target.value)}/>
			        			</Form.Group>
			        			</Col>
			        		</Row>

			        		<Row>
			        			<Col xs={3}>
			        			<Image className="form-all-products-table-image-preview shadow-sm rounded"  src={imageLink} width="100"/>
			        			</Col>

			        			<Col xs={9}>
			        			<Form.Group className="mb-3">
			        			  <Form.Label>Product Image Link</Form.Label>
			        			  <Form.Control
			        			  	className="form-input-all-products-table py-2"
			        			  	as="textarea"
			        			  	rows={4}
			        			  	value={imageLink}
			        			  	onChange={(event)=> setImageLink(event.target.value)}
			        			  />
			        			</Form.Group>
			        			</Col>	        			
			        		</Row>

			        		<Row>
				        		<Form.Group className="mb-3">
				        		  <Form.Label>Description</Form.Label>
				        		  <Form.Control className="form-input-all-products-table py-2" as="textarea" rows={3} value={description} onChange={(event)=> setDescription(event.target.value)}/>
				        		</Form.Group>
			        		</Row>

			        		<Form.Text className="text-muted">Note: Please enter whole numbers only.</Form.Text>
			        		<Row>
			        			<Col>
			        			<Form.Group className="mb-3">
			        			  <Form.Label>Price</Form.Label>
			        			  <Form.Control className="form-input-all-products-table py-2" type="number" value={price} onChange={(event)=> setPrice(event.target.value)}/>
			        			</Form.Group>
			        			</Col>

			        			<Col>
			        			<Form.Group className="mb-3">
			        			  <Form.Label>Stocks</Form.Label>
			        			  <Form.Control className="form-input-all-products-table py-2" type="number" value={stocks} onChange={(event)=> setStocks(event.target.value)}/>
			        			</Form.Group>
			        			</Col>
			        		</Row>
			        		<Container className="d-flex flex-row justify-content-end">
				        		<Button className="all-products-modify-submit shadow me-2" type="submit">SUBMIT</Button>
				        		<Button className="all-products-modify-cancel shadow" as={Link} to={`/manageproducts`}>CANCEL</Button>
			        		</Container>
			        	</Form>
				</Col>
			</Row>
		</Container>
	)
}
