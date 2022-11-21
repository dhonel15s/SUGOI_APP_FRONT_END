// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";
import { useState } from 'react';
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import { Button,  Col,  Container, Row, Form, Image } from 'react-bootstrap';

// IMPORT: CSS
import './styles/ManageProductsTableRow.css';


// ManageProductsTableRow MAIN FUNCTION  ---------------------------------------
export default function ManageProductsTableRow({productProp}) {

	const { _id, name, category, imageLink, description, price, stocks, isActive } = productProp;

	const [isProductActive, setIsProductActive] = useState(isActive);

	let token = sessionStorage.getItem("token");

	function archiveProduct (productId){
		fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => {
			if (data.status === true) {

				setIsProductActive(false);

				Swal.fire({
					title: "Archived!",
					icon: "success",
					text: `Product ${name} successfully archived.`
				});

			}else {
				Swal.fire({
					title: "Archive Failed!",
					icon: "error",
					text: "Error encountered while archiving product."
				});
			}
		})

		
	}

	function unarchiveProduct (productId){
		fetch(`${process.env.REACT_APP_API_URL}/products/unarchive/${productId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => {

			if (data.status === true) {
				setIsProductActive(true);
	
				Swal.fire({
					title: "Unarchived!",
					icon: "success",
					text: `Product ${name} successfully unarchived.`
				});

			}else {
				Swal.fire({
					title: "Unarchiving Failed!",
					icon: "error",
					text: "Error encountered while unarchiving product."
				});
			}
		})

		
	}

	// ManageProductsTableRow MAIN DESIGN ---------------------------------------
	if(isProductActive === true){
		return (
			<tr className="text-dark">
			  <td>#</td>
			  <td>{name}</td>
			  <td>{category}</td>
			  <td><Image src={imageLink} height="70" className="border shadow-sm p-0 m-0"></Image></td>
			  <td>{description}</td>
			  <td>{price}</td>
			  <td>{stocks}</td>
			  <td className="status-text text-primary">Active</td>
			  <td>
			  	<Button as={Link} to={`/manageproducts/modify/${_id}`} className="modify-button shadow-sm table-action-button px-3 m-1">Modify</Button>
			  	<Button className="archive-button shadow-sm table-action-button px-3 m-1" onClick={()=> archiveProduct(_id)}>Archive</Button>
			  </td>

			</tr>

		)
	}else{
		return (
			<tr className="text-dark">
			  <td>#</td>
			  <td>{name}</td>
			  <td>{category}</td>
			  <td><Image src={imageLink} height="70" className="border shadow-sm p-0 m-0"></Image></td>
			  <td>{description}</td>
			  <td>{price}</td>
			  <td>{stocks}</td>
			  <td className="status-text text-danger">Inactive</td>
			  <td>
			  	<Button as={Link} to={`/manageproducts/modify/${_id}`} className="modify-button shadow-sm table-action-button px-3 m-1">Modify</Button>
			  	<Button className="unarchive-button shadow-sm table-action-button px-3 m-1" onClick={()=> unarchiveProduct(_id)}>Unarchive</Button>
			  </td>
			</tr>
		)
	}

	
    
}