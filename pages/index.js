import { Row, Col, Container } from "react-bootstrap";

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
					<h1 className="display-1 p-5 text-center">Home Page</h1>
					<p className="p-5">    
						Adaptability is the ability to adjust and thrive in changing circumstances, and it is essential to navigating the complexities of life. Whether it's adapting to new technologies, social norms, or personal challenges, adaptability allows us to stay resilient and flexible in the face of change.  
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className="p-5">    
						Humility is the practice of recognizing our limitations and imperfections, and it is essential to personal growth and development. Whether it's acknowledging our mistakes and shortcomings, seeking feedback from others, or approaching new situations with a sense of openness and curiosity, humility can help us learn and grow in meaningful ways.  
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className="p-5">
						Optimism is the belief that good things can happen, even in the face of challenges and adversity, and it is essential to maintaining a positive outlook and sense of hope. Whether it's focusing on the positive aspects of a situation, reframing challenges as opportunities, or seeking out support and encouragement, optimism can help us stay resilient and hopeful in difficult times.  
					</p>
				</Col>
			</Row>	
		</>
	)
}
