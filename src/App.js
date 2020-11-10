import React from 'react';
import './App.css';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";


// REDUX

// actions

const EDITORRESIZE = 'EDITORRESIZE';
const PREVIEWERRESIZE = 'PREVIEWERRESIZE';
const EDITORCHANGE = 'EDITORCHANGE';


const resizeEditor = () => {
    return {
        type: EDITORRESIZE
    }
}

const resizePreviewer = () => {
    return {
        type: PREVIEWERRESIZE
    }
}

const editorTextChange = (text) => {
    return {
        type: EDITORCHANGE,
        text: text
    }
}

// reducers

const defaultState = {
    editorIsFullscreen: false,
    editorWidth: '40vw',
    editorHeight: '40vh',
    editorVisibility: 'block',
    previewerIsFullscreen: false,
    previewerWidth: '60vw',
    previewerVisibility: 'block',
    textToConvert: ''
};

const basicReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EDITORRESIZE:
            if (state.editorIsFullscreen) {
                return {
                    ...state,
                    editorIsFullscreen: !state.editorIsFullscreen,
                    editorWidth: '40vw',
                    editorHeight: '40vh',
                    previewerVisibility: 'block'
                }
            } else {
                return {
                    ...state,
                    editorIsFullscreen: !state.editorIsFullscreen,
                    editorWidth: '90vw',
                    editorHeight: '90vh',
                    previewerVisibility: 'none'
                }
            }
        case PREVIEWERRESIZE:
            if (state.previewerIsFullscreen) {
                return {
                    ...state,
                    previewerIsFullscreen: !state.previewerIsFullscreen,
                    previewerWidth: '60vw',
                    editorVisibility: 'block'
                }
            } else {
                return {
                    ...state,
                    previewerIsFullscreen: !state.previewerIsFullscreen,
                    previewerWidth: '90vw',
                    editorVisibility: 'none'
                }
            }
        case EDITORCHANGE:
            return {
                ...state,
                textToConvert: action.text
            }
        default:
            return state;
    }
}

// stores

const store = createStore(basicReducer, applyMiddleware(thunk))


// REACT-REDUX

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToPropsEditor = (dispatch) => {
    return {
        resizeEditorClick: () => {
            dispatch(resizeEditor());
        },
        textUpdate: (text) => {
            dispatch(editorTextChange(text));
        }
    }
}

const mapDispatchToPropsPreviewer = (dispatch) => {
    return {
        resizePreviewerClick: () => {
            dispatch(resizePreviewer());
        }
    }
}

const EditorContainer = connect(mapStateToProps, mapDispatchToPropsEditor)(Editor);
const PreviewerContainer = connect(mapStateToProps, mapDispatchToPropsPreviewer)(Previewer);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <EditorContainer />
                <PreviewerContainer />
            </Provider>
        )
    }
}

export default AppWrapper;
