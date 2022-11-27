// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import { Card, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';

// IMPORT: CSS
import './styles/ProductCard.css';


// PRODUCT CARD FUNCTION MAIN --------------------------------------------------------------
export default function ProductCard({productProp}) {


	const { _id, name,  category, imageLink, description, price, stocks  } = productProp;

    const [productStocks, setProductStocks] = useState(stocks);
    

    // PRODUCT CARD FUNCTIONS -----------------------------------------------------------------
    const addToCart = (productId) =>{

        fetch(`${ process.env.REACT_APP_API_URL }/users/addToCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ sessionStorage.getItem('token') }`
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        .then(response => response.json())
        .then(data => {

            if(data.status){

                fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
                .then(response => response.json())
                .then(data => {
                    // PASS FETCHED DATA TO VARIABLES
                    setProductStocks(data.details.stocks);
                });

                Swal.fire({
                    title: "Added to Cart",
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

        });

    }

    // PRODUCT CARD MAIN DESIGN------------------------------------------------------------------
    return (
        <Col xs={12} md={4} className="p-3">
        	<Card className="my-3 main-products-page-cards">
                <Card.Header className="product-card-title">
                    {name}
                </Card.Header>

                <Card.Body className="p-0 m-0">
                    <Card.Img src={imageLink} height="250" className="product-card-image"/>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                            <p className="m-0 product-card-subtitle">Category</p>
                            <p className="m-0 product-card-text">{category}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <p className="m-0 product-card-subtitle">Description</p>
                            <p className="m-0 product-card-text">{description}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <p className="m-0 product-card-subtitle">Price</p>
                            <p className="m-0 product-card-text">{price}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <p className="m-0 product-card-subtitle">Stocks</p>
                        <p className="m-0 product-card-text">{productStocks} available</p>
                      </ListGroup.Item>
                    </ListGroup>
                </Card.Body>

                <Card.Footer>
                    <Button onClick={(event)=> addToCart(_id)} className="product-card-buttons shadow-sm me-2">Add to cart</Button>
                    <Button as={Link} to={`/products/${_id}`} className="product-card-buttons product-card-buttons-order-now shadow-sm">Order Now</Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}