import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import "./quill.snow.css";

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="viewToolbar">
  </div>
)


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

  render() {

    return (
      <div>
        <CustomToolbar />
        <ReactQuill
        ref={(el) => { this.reactQuillRef = el }}
        className="testing"
        value={this.state.text}
        readOnly={true}
        modules={MyComponent.modules}
        formats={MyComponent.formats}
        />
      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
MyComponent.modules = {
  toolbar: {
    container: "#viewToolbar",
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
MyComponent.formats = [
  'header', 'font', 'size', 'color', 'background',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video'
]

export default MyComponent;
