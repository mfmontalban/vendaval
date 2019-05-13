import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addContribution } from '../../actions/staffActions';

import TextFieldGroup from '../application/common/textFieldGroup';
import SelectListGroup from '../application/common/selectListGroup';
import TextAreaFieldGroup from '../application/common/textAreaFieldGroup';
import Quill from '../application/common/quillEdit';
import Footer from '../application/layout/footer'

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

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
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
      <div>
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
        <Footer />
      </div>
    );
  }
}

AddContribution.propTypes = {
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { addContribution })(
  withRouter(AddContribution)
);
