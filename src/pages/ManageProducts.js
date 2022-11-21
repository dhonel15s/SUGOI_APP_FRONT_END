// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import { Tab, Tabs, Table, Container, Row, Col, Form, Image, Button } from 'react-bootstrap';

// IMPORT: CSS
import "./styles/ManageProducts.css";

// IMPORT: COMPONENTS
import ManageProductsTableRow from "../components/ManageProductsTableRow.js";


// MANAGE PRODUCTS FUNCTION MAIN --------------------------------------------------------------
export default function ManageProducts() {

	// DECLARE USE STATES
	const [allProductsRows, setAllProductsRows] = useState([]);
	const [archivedProductsRows, setArchivedProductsRows] = useState([]);

	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [imageLink, setImageLink] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrGoGc5jeRMVBq5AlMond7BFu2zbvPKg2mtpNh34sIEDdh7nZKfUN__Y3s7fji_DttLs&usqp=CAU');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);

	let user = {
		token: sessionStorage.getItem("token"),
	    id: sessionStorage.getItem("id"),
	    isAdmin: sessionStorage.getItem("isAdmin")
	}

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE

	// ALL PRODUCTS --------------------------------------
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/products/all`)
		.then(response => response.json())
		.then(data => {
			// DISPLAY EACH PRODUCTS
			setAllProductsRows(data.map(product =>{
				return(
					<ManageProductsTableRow key={product._id} productProp={product}/>
				);
			}));
		})
	}, []);

	// ARCHIVED PRODUCTS --------------------------------------
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/products/all`)
		.then(response => response.json())
		.then(data => {
			// DISPLAY EACH PRODUCTS
			setArchivedProductsRows(data.map(product =>{
				if (!product.isActive) {
					return(
						<ManageProductsTableRow key={product._id} productProp={product}/>
					);
				}
			}));
		})
	}, []);


	function authenticate(event) {
		event.preventDefault();

		if (user.isAdmin === "true") {

			createProduct();

		}else{
			// IF NON ADMIN
			Swal.fire({
			    title: "Authentication Failed!",
			    icon: "error",
			    text: "Users are not allowed to perform this action."
			});	
		}

	} 


	const createProduct = () =>{

		fetch(`${ process.env.REACT_APP_API_URL }/products/create`, {
			method: "POST",
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
					title: "Product Created!",
					icon: "success",
					text: data.message
				});

				setName('');
				setCategory('');
				setImageLink('');
				setDescription('');
				setPrice(0);
				setStocks(0);

			}
			else{
				Swal.fire({
					title: "Failed to create product.",
					icon: "error",
					text: data.message
				});
			}

		});

	}

	// MANAGE PRODUCTS MAIN DESIGN------------------------------------------------------------------
	return(
		<Tabs defaultActiveKey="all" className="mt-4 admin-tabs">

			{/*ALL ACTIVE PRODUCTS*/}
			<Tab eventKey="all" title="All Products">
			  <Table striped bordered className="border shadow-sm text-white mt-2">
			        <thead className="product-table-header">
			          <tr>
			            <td className="product-table-header-item">No.</td>
			            <td className="product-table-header-item">Product Name</td>
			            <td className="product-table-header-item">Category</td>
			            <td className="product-table-header-item">Product Image</td>
			            <td className="product-table-header-item">Description</td>
			            <td className="product-table-header-item">Price</td>
			            <td className="product-table-header-item">Stocks</td>
			            <td className="product-table-header-item">Status</td>
			            <td className="product-table-header-item">Actions</td>
			          </tr>
			        </thead>
			        <tbody>
			          {allProductsRows}
			        </tbody>
			      </Table>
			</Tab>

			{/*ARCHIVED PRODUCTS*/}
			<Tab eventKey="archived" title="Archived Products">
				<Table striped bordered className="border shadow-sm text-white mt-2">
					<thead className="product-table-header">
					  <tr>
					    <td className="product-table-header-item">No.</td>
					    <td className="product-table-header-item">Product Name</td>
					    <td className="product-table-header-item">Category</td>
					    <td className="product-table-header-item">Product Image</td>
					    <td className="product-table-header-item">Description</td>
					    <td className="product-table-header-item">Price</td>
					    <td className="product-table-header-item">Stocks</td>
					    <td className="product-table-header-item">Status</td>
					    <td className="product-table-header-item">Actions</td>
					  </tr>
					</thead>
					<tbody>
					  {archivedProductsRows}
					</tbody>
				</Table>		  
			</Tab>

			<Tab eventKey="add-product" title="Add Product">
				<Container className="mt-4">
					<Row>
						<Col lg={{ span: 6, offset: 3 }} className="modify-product-main border p-4 shadow-sm">
								<h3 className="modify-form-title pb-2">Add Product</h3>
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
					        			<Image className="form-all-products-table-image-preview shadow-sm rounded"  src={imageLink} width="120"/>
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
					        			<Col>
						        		<Form.Group className="mb-3">
						        		  <Form.Label className="mt-4">Description</Form.Label>
						        		  <Form.Control className="form-input-all-products-table py-2" as="textarea" rows={5} value={description} onChange={(event)=> setDescription(event.target.value)}/>
						        		</Form.Group>
						        		</Col>
						        		<Col>
						        			<Form.Text className="text-muted">Note: Please enter whole numbers only.</Form.Text>
						        			<Form.Group className="mb-3">
						        			  <Form.Label>Price</Form.Label>

						        			  <Form.Control className="form-input-all-products-table py-2" type="number" value={price} onChange={(event)=> setPrice(event.target.value)}/>
						        			  <Form.Label>Stocks</Form.Label>
						        			  <Form.Control className="form-input-all-products-table py-2" type="number" value={stocks} onChange={(event)=> setStocks(event.target.value)}/>
						        			</Form.Group>
						        		</Col>
					        		</Row>

					        		<Container className="d-flex flex-row justify-content-end">
						        		<Button className="all-products-modify-submit shadow-sm p-2 px-4 me-2" type="submit">CREATE</Button>
						        		<Button className="all-products-modify-cancel shadow"
						        		onClick={(event) => {
						        				setName('');
						        				setCategory('');
						        				setImageLink('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrGoGc5jeRMVBq5AlMond7BFu2zbvPKg2mtpNh34sIEDdh7nZKfUN__Y3s7fji_DttLs&usqp=CAU');
						        				setDescription('');
						        				setPrice(0);
						        				setStocks(0);
						        			}
						        		}
						        		>RESET</Button>
					        		</Container>
					        	</Form>
						</Col>
					</Row>
				</Container>
			</Tab>	      
		</Tabs>
		
	)
}