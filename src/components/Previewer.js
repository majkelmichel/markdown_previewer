import React from "react";
import {Col, Container, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";

const marked = require('marked');

marked.setOptions({
    breaks: true
})

class Previewer extends React.Component {
    componentDidMount() {
        // renders example text from editor
        document.getElementById('preview').innerHTML = marked(this.props.textToConvert);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // renders text from editor
        document.getElementById('preview').innerHTML = marked(this.props.textToConvert);
    }

    render() {
        return (
            <div id='previewer-outer' style={{
                margin: "5vh auto",
                width: this.props.previewerWidth,
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
                    <div id='preview' />
                </Container>
            </div>
        )
    }
}

export default Previewer;