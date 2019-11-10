import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import "./quill.snow.css";

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.reactQuillRef = null;
    this.state = { text: '' } // You can also pass a Quill Delta here
  }

  componentDidMount () {
    if (this.props.contributions) {
      const stored = JSON.parse(this.props.contributions);
      this.reactQuillRef.getEditor().setContents(stored);
    }
  }

  componentDidUpdate () {
    this.storeDelta()
  }

  storeDelta () {
    
  }


  handleChange = (value) => {
    this.setState({ text: value });
    const quillRef = this.reactQuillRef.getEditor().getContents();
    const x = JSON.stringify(quillRef);
    this.props.storeQuillDelta(x);
  }

  render() {

    return (
      <ReactQuill
      ref={(el) => { this.reactQuillRef = el }}
      value={this.state.text}
      onChange={this.handleChange}
      modules={MyComponent.modules}
      formats={MyComponent.formats}
      />
    )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

MyComponent.modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      [{ 'color': [] }, { 'background': [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'},
       { 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
MyComponent.formats = [
  'header', 'font', 'size',
  'color', 'background', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video'
]

export default MyComponent;
