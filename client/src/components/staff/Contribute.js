import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import TextEditor from '../common/textEditor/TextEditor'
import Quill from '../common/QuillEdit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContribution } from '../../actions/staffActions';


class AddContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      topic: '',
      title: '',
      banner: '',
      bannerFile: '',
      description: '',
      content: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  fileSelected = (e) => {
    this.setState({banner: e.target.files[0]});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('file', this.state.banner);

    const contribData = {
      type: this.state.type,
      topic: this.state.topic,
      title: this.state.title,
      description: this.state.description,
      content: localStorage.content,
      contentHTML: localStorage.contentHTML
    };

    this.props.addContribution(contribData, data, this.props.history);
  }

  render() {
    // Select options for status
    const type = [
      { label: 'Type of Contribution', value: 0 },
      { label: 'Article', value: 'Article' },
      { label: 'Video', value: 'Video' },
      { label: 'Photograph', value: 'Photograph' },
      { label: 'Music', value: 'Music' },
    ];

    // Select options for status
    const topic = [
      { label: 'Topic for Contribution', value: 0 },
      { label: 'Science', value: 'Science' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Mathematics', value: 'Mathematics' },
    ];

    const { errors } = this.state;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="col-md-10 m-auto">
          <Link to="/staff/dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-6 text-center mt-3">Contribution</h1>
          <form onSubmit={this.onSubmit}>
            <SelectListGroup
              placeholder="Type"
              name="type"
              value={this.state.type}
              onChange={this.onChange}
              options={type}
              error={errors.type}
            />
            <SelectListGroup
              placeholder="Topic"
              name="topic"
              value={this.state.topic}
              onChange={this.onChange}
              options={topic}
              error={errors.topic}
            />
            <TextFieldGroup
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="btn btn-secondary non-clickable">Banner</div>
              </div>
              <div className="custom-file clickable">
                <input type="file" onChange={this.fileSelected} className="custom-file-input clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                <label className="custom-file-label clickable" htmlFor="inputGroupFile01">Choose Image</label>
              </div>
            </div>


            <TextAreaFieldGroup
              placeholder="Short Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Description will appear under the title"
            />
            <Quill />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContribution.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addContribution })(
  withRouter(AddContribution)
);
