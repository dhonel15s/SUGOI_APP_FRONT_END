// IMPORT: DEPENDENCIES
import { useEffect, useState } from "react";

// IMPORT: BOOTSTRAP ELEMENTS
import { Tab, Tabs, Table } from 'react-bootstrap';

// IMPORT: CSS
import "./styles/ManageProducts.css";

// IMPORT: COMPONENTS
import ManageProductsTableRow from "../components/ManageProductsTableRow";


// MANAGE PRODUCTS FUNCTION MAIN --------------------------------------------------------------
export default function ManageProducts() {

	// DECLARE USE STATES
	const [productRows, setProductRows] = useState([]);

	// ACTIVE FETCHING OF PRODUCTS DATA FROM DATABASE
	useEffect(() =>{

		// FETCH ACTIVE PRODUCTS FROM DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/products/all`)
		.then(response => response.json())
		.then(data => {
			// DISPLAY EACH PRODUCTS
			setProductRows(data.map(product =>{
				return(
					<ManageProductsTableRow key={product._id} productProp={product}/>
				);
			}));
		})
	}, []);

	

	// MANAGE PRODUCTS MAIN DESIGN------------------------------------------------------------------
	return(
		<Tabs defaultActiveKey="all" className="mt-5">

			{/*ALL ACTIVE PRODUCTS*/}
			<Tab eventKey="all" title="All Products">
			  <Table striped bordered className="border shadow-sm text-white">
			        <thead className="product-table-header">
			          <tr>
			            <td className="product-table-header-item">No.</td>
			            <td className="product-table-header-item">Product Name</td>
			            <td className="product-table-header-item">Category</td>
			            <td className="product-table-header-item">Image Link</td>
			            <td className="product-table-header-item">Description</td>
			            <td className="product-table-header-item">Price</td>
			            <td className="product-table-header-item">Stocks</td>
			            <td className="product-table-header-item">Status</td>
			            <td className="product-table-header-item">Actions</td>
			          </tr>
			        </thead>
			        <tbody>
			          {productRows}
			        </tbody>
			      </Table>
			</Tab>

			{/*ARCHIVED PRODUCTS*/}
			<Tab eventKey="archived" title="Archived Products">
			  
			</Tab>		      
		</Tabs>
		
	)
}