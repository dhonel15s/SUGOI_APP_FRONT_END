// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import { Card, Button, Row, Col, Image } from 'react-bootstrap';

// IMPORT: CSS
import './styles/ProductCard.css';


// PRODUCT CARD FUNCTION MAIN --------------------------------------------------------------
export default function ProductCard({productProp}) {


	const { _id, name,  category, imageLink, description, price, stocks  } = productProp;

    const [productName, setProductName] = useState(name);
    const [productCategory, setProductCategory] = useState(category);
    const [productImageLink, setProductImageLink] = useState(imageLink);
    const [productDescription, setProductDescription] = useState(description);
    const [productPrice, setProductPrice] = useState(price);
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
    	<Col xs={12} md={4} className="p-4">
    		<Row className="border rounded shadow-sm p-2 main-products-page-cards">
                <Row>
        			<Col xs={5} className="d-flex align-items-center">
        				<Image src={productImageLink} fluid/>
        			</Col>
       				<Col xs={7}>
       					<p className="m-0 product-card-title"><strong>{productName}</strong></p>
       					<p className="m-0 product-card-subtitle">Category</p>
                        <p className="m-0 product-card-text">{productCategory}</p>
       					<p className="m-0 product-card-subtitle">Description</p>
                        <p className="m-0 product-card-text">{productDescription}</p>
       					<p className="m-0 product-card-subtitle">Price</p>
                        <p className="m-0 product-card-text">{productPrice}</p>
       					<p className="m-0 product-card-subtitle">Stocks</p>
                        <p className="m-0 product-card-text">{productStocks}</p>
                        <Button onClick={(event)=> addToCart(_id)} className="product-card-buttons shadow-sm me-2">Add to cart</Button>
                        <Button as={Link} to={`/products/${_id}`} className="product-card-buttons product-card-buttons-order-now shadow-sm">Order Now</Button>
       				</Col>
                </Row>

                
    		</Row>
        </Col>
    )
}