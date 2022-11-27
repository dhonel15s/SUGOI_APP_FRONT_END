// IMPORT: BOOTSTRAP ELEMENTS
import { Accordion, ListGroup, Row, Col } from 'react-bootstrap';

// IMPORT: CSS
import './styles/OrdersRow.css';



// ORDER ROW MAIN FUNCTION  ---------------------------------------
export default function OrdersRow({orderItemProp}) {
	
	const { _id, purchasedOn, deliveryAddress, customerName, products, deliveryMode, deliveryFee, paymentMode, totalAmount } = orderItemProp;

	let listItems = [];
	listItems = products.map(product => {
		return (
		<ul key={product._id}>
		      <li className="product-card-text p-0 m-0">{product.productName} @ Php {product.productPrice} x {product.quantity} :</li>
		      <p className="product-card-subtitle p-0 m-0">Php {product.subtotal}</p>
		</ul>
		)
	})

	// ORDER ROW MAIN DESIGN ---------------------------------------
	return (
		    <Accordion.Item eventKey={_id}>
		        <Accordion.Header>
		        	<p className="product-card-text p-0 m-0">On {purchasedOn} for <strong className="product-card-subtitle">{customerName}</strong> to <strong className="product-card-subtitle">{deliveryAddress}</strong></p>
		        </Accordion.Header>
		        <Accordion.Body>
		          <ListGroup className="list-group-flush p-0 m-0">
		          	<Row className="p-0 m-0">
			          	<Col className="p-0 m-0">
			          		<p><strong>Products:</strong></p>
			            	{listItems}
			            </Col>
			            <Col className="p-0 m-0">
			            	<p><strong>Order Details:</strong></p>
			            	<ul>
			            	    <li className="product-card-text p-0 m-0">Delivery Mode</li>
			            	    <p className="product-card-subtitle p-0 m-0">{deliveryMode} @ Php {deliveryFee}</p>
			            	</ul>
			            	<ul>	
			            		<li className="product-card-text p-0 m-0">Payment Mode</li>
			            		<p className="product-card-subtitle p-0 m-0">{paymentMode}</p>
			            	</ul>
			            	<ul>
			            		<li className="product-card-text p-0 m-0">Order Total:</li>
			            		<p className="product-card-subtitle p-0 m-0">{totalAmount}</p>
			            	</ul>
			            </Col>
		            </Row>
		           </ListGroup>
		        </Accordion.Body>
		      </Accordion.Item> 
	)    
}