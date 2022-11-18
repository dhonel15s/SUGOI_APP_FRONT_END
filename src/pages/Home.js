// IMPORT: COMPONENTS
import Banner from '../components/Banner.js';
import Highlights from '../components/Highlights';


export default function Home(){

	// DATA TO BE DISPLAYED IN HOME PAGE BANNER
	const data = {
		title: "Sugoi!",
		subtitle: "Flavors of Japan.",
		content: "The Original Online Japanese Restaurant in Town.",
		destination: "/products",
		label: "Visit our menu."
	}

	// PASS DATA TO BANNER PROP AND DISPLAY ALONG WITH HIGHLIGHTS
	return(
		<>
			<Banner bannerProp={data}/>
			<Highlights/>
		</>
	)
}