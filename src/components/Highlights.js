// IMPORT: BOOTSTRAP ELEMENTS
import {Col, Row, Card} from "react-bootstrap"

// IMPORT: CSS
import './styles/Highlights.css';

// HIGHLIGHTS FUNCTION MAIN --------------------------------------------------------------
export default function Highlights(){
    return(
        <Row className="my-3">
            <Col xs={12} md={4} className="px-4 py-2">
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title className="text-center text-sm-start">
                            <h2>Authentic Japanese Ingredients</h2>
                        </Card.Title>
                        <Card.Text className="text-justify">
                            Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4} className="px-4 py-2">
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title className="text-center text-sm-start">
                            <h2>Fast Delivery Options</h2>
                        </Card.Title>
                        <Card.Text className="text-justify">
                            Ex Lorem cillum consequat ad. Consectetur enim sunt amet sit nulla dolor exercitation est pariatur aliquip minim. Commodo velit est in id anim deserunt ullamco sint aute amet. Adipisicing est Lorem aliquip anim occaecat consequat in magna nisi occaecat consequat et. Reprehenderit elit dolore sunt labore qui.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4} className="px-4 py-2">
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title className="text-center text-sm-start">
                            <h2>Food Discounts and More</h2>
                        </Card.Title>
                        <Card.Text className="text-justify">
                            Minim nostrud dolore consequat ullamco minim aliqua tempor velit amet. Officia occaecat non cillum sit incididunt id pariatur. Mollit tempor laboris commodo anim mollit magna ea reprehenderit fugiat et reprehenderit tempor. Qui ea Lorem dolor in ad nisi anim. Culpa adipisicing enim et officia exercitation adipisicing.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}