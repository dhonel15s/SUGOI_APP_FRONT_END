// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState } from 'react';

// IMPORT: BOOTSTRAP ELEMENTS
import { Button,  Col,  Container, Modal, Row, Form, Image } from 'react-bootstrap';

// IMPORT: CSS
import './styles/ManageProductsTableRow.css';



// ManageProductsTableRow MAIN FUNCTION  ---------------------------------------
export default function ManageProductsTableRow({productProp}) {

	const { _id, name, category, imageLink, description, price, stocks, isActive } = productProp;

	const [productName, setproductName] = useState(name);
	const [productCategory, setproductCategory] = useState(category);
	const [productImageLink, setproductImageLink] = useState(imageLink);
	const [productDescription, setproductDescription] = useState(description);
	const [productPrice, setproductPrice] = useState(price);
	const [productStock, setproductStock] = useState(stocks);


	// MODAL FUNCTION
	function ModifyProductModal(props) {
	  return (
	    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" backdrop="static">
	      <Modal.Header>
	        <Modal.Title id="contained-modal-title-vcenter" className="modify-product-title">
	          Modify Product
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Container>
	        	<Form>
	        		<Row>
	        			<Col>
	        			<Form.Group className="mb-3">
	        			  <Form.Label>Product Name</Form.Label>
	        			  <Form.Control className="form-input-all-products-table py-2" type="text" defaultValue={productName}/>
	        			</Form.Group>
	        			</Col>

	        			<Col>
	        			<Form.Group className="mb-3">
	        			  <Form.Label>Category</Form.Label>
	        			  <Form.Control className="form-input-all-products-table py-2" type="text" defaultValue={productCategory}/>
	        			</Form.Group>
	        			</Col>
	        		</Row>

	        		<Row>
	        			<Col xs={3}>
	        			<Image className="border" src={productImageLink} width="100"/>
	        			</Col>

	        			<Col xs={9}>
	        			<Form.Group className="mb-3">
	        			  <Form.Label>Product Image Link</Form.Label>
	        			  <Form.Control
	        			  	className="form-input-all-products-table py-2"
	        			  	as="textarea"
	        			  	rows={4}
	        			  	defaultValue={productImageLink}
	        			  	onChange={(event) => setproductImageLink(event.target.value)}
	        			  />
	        			</Form.Group>
	        			</Col>

	        			
	        		</Row>

	        		<Row>
		        		<Form.Group className="mb-3">
		        		  <Form.Label>Description</Form.Label>
		        		  <Form.Control className="form-input-all-products-table py-2" as="textarea" rows={3} defaultValue={productDescription}/>
		        		</Form.Group>
	        		</Row>

	        		<Form.Text className="text-muted">Note: Please enter whole numbers only.</Form.Text>
	        		<Row>
	        			<Col>
	        			<Form.Group className="mb-3">
	        			  <Form.Label>Price</Form.Label>
	        			  <Form.Control className="form-input-all-products-table py-2" type="number" defaultValue={productPrice}/>
	        			</Form.Group>
	        			</Col>

	        			<Col>
	        			<Form.Group className="mb-3">
	        			  <Form.Label>Stocks</Form.Label>
	        			  <Form.Control className="form-input-all-products-table py-2" type="number" defaultValue={productStock}/>
	        			</Form.Group>
	        			</Col>
	        		</Row> 		

	        	</Form>
	          
	        </Container>
	      </Modal.Body>
	      <Modal.Footer>
	      	<Button className="all-products-modify-submit shadow" onClick={props.onHide} type="submit">SUBMIT</Button>
	        <Button className="all-products-modify-cancel shadow" onClick={props.onHide}>CANCEL</Button>
	      </Modal.Footer>
	    </Modal>
	  );
	}

	const [modalShow, setModalShow] = useState(false);


	// ManageProductsTableRow MAIN DESIGN ---------------------------------------
	if(isActive === true){
		return (
			<tr className="text-dark">
			  <td>#</td>
			  <td>{name}</td>
			  <td>{category}</td>
			  <td>{imageLink}</td>
			  <td>{description}</td>
			  <td>{price}</td>
			  <td>{stocks}</td>
			  <td className="status-text text-primary">Active</td>
			  <td>
			  	<Button className="modify-button shadow-sm table-action-button px-3 m-1" onClick={() => setModalShow(true)}>Modify</Button>
			  	<Button className="archive-button shadow-sm table-action-button px-3 m-1">Archive</Button>
			  	<ModifyProductModal show={modalShow} onHide={() => setModalShow(false)} />
			  </td>
			</tr>
		)
	}else{
		return (
			<tr className="text-dark">
			  <td>#</td>
			  <td>{name}</td>
			  <td>{category}</td>
			  <td>{imageLink}</td>
			  <td>{description}</td>
			  <td>{price}</td>
			  <td>{stocks}</td>
			  <td className="status-text text-danger">Inactive</td>
			  <td>
			  	<Button className="modify-button shadow-sm table-action-button px-3 m-1" onClick={() => setModalShow(true)}>Modify</Button>
			  	<Button className="unarchive-button shadow-sm table-action-button px-3 m-1">Unarchive</Button>
			  	<ModifyProductModal show={modalShow} onHide={() => setModalShow(false)} />
			  </td>
			</tr>
		)
	}

	
    
}