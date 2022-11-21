// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState } from 'react';


// IMPORT: BOOTSTRAP ELEMENTS
import { Button,  Col,  Container, Row, Form, Image } from 'react-bootstrap';




// ManageProductsTableRow MAIN FUNCTION  ---------------------------------------
export default function CartRow({cartItemProp}) {
	
	const { productId, productName, productPrice, productImageLink, quantity, addedOn, subtotal, stocks, isActive } = cartItemProp;	

	// CART ROW MAIN DESIGN ---------------------------------------
	return (
		<tr className="text-dark">
			<td>
			<Row>
				<Col xs="2">
				<Image src={productImageLink} width="60"/>
				</Col>
				<Col xs="10">
				{productName}
				</Col>
			</Row>
			</td>
		  <td>{quantity}</td>
		  <td>{productPrice}</td>
		  <td>{subtotal}</td>
		  

		</tr>

	)

	
    
}