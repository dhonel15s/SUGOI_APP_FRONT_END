// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";

// IMPORT: BOOTSTRAP ELEMENTS
import { Card, Button, Col } from 'react-bootstrap';

// IMPORT: CSS
import './styles/ProductCard.css';

export default function ProductCard({productProp}) {


	const { _id, name, description, category, stocks, price } = productProp;


    return (
    	<Col xs={6} md={3}>
	        <Card className="my-3">
	            <Card.Body>
	            	{/*PRODUCT TITLE*/}
	                <Card.Title>
	                    {name}
	                </Card.Title>
	                <Card.Subtitle>
	                    DESCRIPTION:
	                </Card.Subtitle>
	                <Card.Text>
	                    {description}
	                </Card.Text>
	                <Card.Subtitle>
	                    PRICE:
	                </Card.Subtitle>
	                <Card.Text>
	                    Php {price}
	                </Card.Text>
	                <Card.Subtitle>
	                    STOCKS:
	                </Card.Subtitle>
	                <Card.Text>
	                    {stocks} Available
	                </Card.Text>
	                <Button as={Link} to={`/products/${_id}`} className="banner-button p-2 px-5 shadow">Details</Button>
	            </Card.Body>
	        </Card>
        </Col>
    )
}