import { Row, Col } from "react-bootstrap";

export default function Home() {

	return (
		<>
			<style jsx>{`
				p {
					font-size: x-large;
				}

				div {
					min-height: 100%;
				}
			`}</style>		
			<Row>
				<Col>
					<h1 className="display-1 p-5 text-center">Bags.io</h1>
					<p className="p-5">   
						Welcome to bags.io. The go-to online tool for managing your most valueable personal belongings. Bags.io was created as a personal inventory managment system for users to honestly re-evalute and prioritize their possesions, whether they are sentimental or functionally neccessary items.  
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className="p-5">
						Bag.io is the perfect for people with compulsive-hoarding/compulsive-decluttering disorders, digital nomads, minimalists, migrants, evacuees and frequent property renters. Your bags are a representation of carried, worn or rolled containers. Your items are what you take with you.
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className="p-5">
						Managing your most prized belongings has never been easier with Bags.io. Whether you might experience climate change displacement, a job change/re-location, or the need for improving cleaning/organizing, bags.io has you covered. Sign up now on a journey of self-discovery. Find out what your things mean to you, today!
					</p>
				</Col>
			</Row>	
		</>
	)
}
