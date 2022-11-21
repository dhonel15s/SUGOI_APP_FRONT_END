// IMPORT: DEPENDENCIES
import { Link } from "react-router-dom";

// IMPORT: BOOTSTRAP ELEMENTS
import { Row, Col, Button, Image } from "react-bootstrap";

// IMPORT: CSS
import "./styles/Banner.css";


// BANNER FUNCTION MAIN --------------------------------------------------------------
export default function Banner({bannerProp}){

	// DECONSTRUCT THE BANNER DATA FROM PROP
	const {title, subtitle, content, destination, label} = bannerProp;

	// BANNER MAIN DESIGN------------------------------------------------------------------
	return(
		<Row>
			<Col className="p-5 text-center">
				<Image src={require('../assets/highlights/looney-accept-cookies.gif')} width="300"/>
				{/*<Image src={require('../assets/logo.jpg')} width="100" className=""/>*/}
				<h1 className="banner-title">{title}</h1>
				<h5 className="banner-subtitle">{subtitle}</h5>
            	<p>{content}</p>
				<Button as = {Link} to={destination} className="banner-button p-2 px-5 shadow">{label}</Button>
			</Col>
		</Row>
	)
}