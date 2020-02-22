import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6
import "./quill.snow.css";

import Div from './styled/div';

class QuillEdit extends Component {
  constructor(props) {
    super(props)
    this.reactQuillRef = null;
    this.state = { text: '' } // You can also pass a Quill Delta here
  }

  componentDidMount () {
    if (this.props.staff.contribution) {
      const stored = JSON.parse(this.props.staff.contribution.content);
      this.reactQuillRef.getEditor().setContents(stored);
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.staff.contribution !== prevProps.staff.contribution) {
      const stored = JSON.parse(this.props.staff.contribution.content);
      this.reactQuillRef.getEditor().setContents(stored);
    }
  }

  handleChange = (value) => {
    this.setState({ text: value });
    const quillRef = this.reactQuillRef.getEditor().getContents();
    const x = JSON.stringify(quillRef);
    this.props.storeQuillDelta(x);
  }

  render() {

    const { application } = this.props;

    return (
      <Div className="bottom-outer-shadow m-10px" backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          value={this.state.text}
          onChange={this.handleChange}
          modules={QuillEdit.modules}
          formats={QuillEdit.formats}
        />
      </Div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

QuillEdit.modules = {
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
QuillEdit.formats = [
  'header', 'font', 'size',
  'color', 'background', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video'
]

QuillEdit.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  staff: state.staff,
});

export default connect(mapStateToProps, {})(withRouter(QuillEdit));
