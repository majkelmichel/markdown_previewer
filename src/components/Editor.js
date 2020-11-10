import React from "react";
import $ from "jquery";
import {Col, Container, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";

class Editor extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const heightToApply = $('#editor-container')[0].offsetHeight - $('#upper-editor-row')[0].offsetHeight - 6;
        $('#row-to-expand').height(heightToApply);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const heightToApply = $('#editor-container')[0].offsetHeight - $('#upper-editor-row')[0].offsetHeight - 6;
        $('#row-to-expand').height(heightToApply);
    }
    handleChange(event) {
        this.props.textUpdate(event.target.value);
    }
    render() {
        return (
            <div id='editor-outer' style={{
                width: this.props.editorWidth,
                height: this.props.editorHeight,
                margin: '2vh auto',
                display: this.props.editorVisibility
            }}>
                <Container fluid='md' id='editor-container' className='Editor-container'>
                    <Row id='upper-editor-row'>
                        <Container className='Editor-header'>
                            <Row>
                                <Col xs='11'>
                                    <FontAwesomeIcon icon={faBook}/> Editor
                                </Col>
                                <Col xs='1' style={{
                                    textAlign: 'end'
                                }}>
                                    <FontAwesomeIcon onClick={this.props.resizeEditorClick} icon={faExpandArrowsAlt}
                                                     className='Editor-resize-button' />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row id='row-to-expand'>
                        <textarea className='Editor-textarea' onChange={this.handleChange} />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Editor;