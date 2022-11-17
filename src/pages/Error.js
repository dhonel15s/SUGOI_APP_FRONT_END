// IMPORT: COMPONENTS
import Banner from '../components/Banner.js';

export default function Error(){

	// DATA TO BE DISPLAYED IN ERROR PAGES
	const data = {
		title: "404 - Page Not Found!",
		subtitle: "The page you are trying to access cannot be found.",
		content: "It's either the page has been moved or the url is incorrect",
		destination: "/",
		label: "Go to Homepage"
	}

	// PASS DATA TO BANNER PROP
	return(
		<>
			<Banner bannerProp={data}/>
		</>
	)
}