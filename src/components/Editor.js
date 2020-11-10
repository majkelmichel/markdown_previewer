import React from "react";
import $ from "jquery";
import {Col, Container, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";


const defaultText = `# Hello
## Welcome to my markdown previewer

You can find source code **[here](https://github.com/majkelmichel/markdown_previewer)**

Run \`npm start\` to start the app

![doge](https://vignette.wikia.nocookie.net/mlg-parody/images/0/05/Doge.png/revision/latest/top-crop/width/360/height/450?cb=20151014005818)

> Have a doge ~ Albert Einstein

\`\`\`
constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
}
\`\`\`

### Things to buy:
* **sweets**
* apples
`


class Editor extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // resizes textarea to fit the container
        const heightToApply = $('#editor-container')[0].offsetHeight - $('#upper-editor-row')[0].offsetHeight - 6;
        $('#row-to-expand').height(heightToApply);

        // inputs example text into editor
        $('#editor')[0].innerHTML = defaultText;
        this.props.textUpdate(defaultText);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // resizes textarea to fit the container
        const heightToApply = $('#editor-container')[0].offsetHeight - $('#upper-editor-row')[0].offsetHeight - 6;
        $('#row-to-expand').height(heightToApply);
    }
    handleChange(event) {
        // dispatches redux action on change in textarea field
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
                        <textarea id='editor' className='Editor-textarea' onChange={this.handleChange} />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Editor;