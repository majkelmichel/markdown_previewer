import React from "react";
import marked_1 from "marked/lib/marked.esm";
import {Col, Container, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";

class Previewer extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        document.getElementById('previewer').innerHTML = marked_1(this.props.textToConvert);
    }

    render() {
        return (
            <div id='previewer-outer' style={{
                margin: "5vh auto",
                width: this.props.previewerWidth,
                height: this.props.previewerHeight,
                display: this.props.previewerVisibility
            }}>
                <Container fluid='md' id='previewer-container' className='Previewer-container'>
                    <Row id='upper-previewer-row'>
                        <Container className='Editor-header'>
                            <Row>
                                <Col xs='11'>
                                    <FontAwesomeIcon icon={faEye} /> Previewer
                                </Col>
                                <Col xs='1' style={{
                                    textAlign: 'end'
                                }}>
                                    <FontAwesomeIcon onClick={this.props.resizePreviewerClick} icon={faExpandArrowsAlt} className='Editor-resize-button' />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <div id='previewer' />
                </Container>
            </div>
        )
    }
}

export default Previewer;