import React, {Component} from 'react';
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html'

class EditorContainer extends Component{
    constructor(props){
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
        message:'',
        rawMessage:''
      };
      this.onEditorStateChange = this.onEditorStateChange.bind(this);
      this.handleEditorStateToMessage = this.handleEditorStateToMessage.bind(this);
    }
    onEditorStateChange: Function = (editorState) => {
      // console.log(editorState)
      this.setState({
        editorState,
        rawMessage: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      });
  
     
    };
    handleEditorStateToMessage(){
      console.log(this.state.rawMessage)
      this.setState({
          message: this.state.rawMessage
      })
  }
  
    render(){
      const { editorState } = this.state;
  // console.log(editorState)
  
      return <div>
      <div style={{width:'70%',margin: 'auto', padding: 20}}>
        <Editor editoreStyle={{width:'40%', border:'10px solid black'}}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}  
            
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        <div>
       </div>
      </div>
      <h3 style={{width:'70%',margin: 'auto', padding:20}}>Preview:-</h3>
      <div dangerouslySetInnerHTML={{__html: this.state.message}}
       style={{width:'70%',margin: 'auto', border:'1px solid grey', padding:20}}></div>
      </div>
    }
  
  }

  export default EditorContainer
  
  