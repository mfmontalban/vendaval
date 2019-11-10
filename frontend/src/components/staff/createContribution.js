import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addContribution } from '../../actions/staffActions';
import Resizer from 'react-image-file-resizer';

import TextFieldGroup from '../application/main/common/textFieldGroup';
import SelectListGroup from '../application/main/common/selectListGroup';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup';
import Quill from '../application/main/common/quillEdit';

class AddContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      topic: '',
      title: '',
      banner: '',
      bannerSm: '',
      bannerLg: '',
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

  bannerAdded = (e) => {
    const name = e.target.files[0].name;
    const fileType = e.target.files[0].type.split('/')[1];
    var fileInput = false;
    if(e.target.files[0]) {
        fileInput = true
    }
    if(fileInput) {
      let fileName = name + '_' + this.props.admin.id + '_original'
      let file = new File([e.target.files[0]], fileName, {type: fileType});
      this.setState({banner: file});
      
      Resizer.imageFileResizer(
        e.target.files[0],
        325,
        325,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_sm'
          let file = new File([uri], fileName, {type: fileType});
          this.setState({bannerSm: file});
        },
        'blob'
      );

      Resizer.imageFileResizer(
        e.target.files[0],
        1420,
        1000,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_lg'
          let file = new File([uri], fileName, {type: fileType});
          this.setState({bannerLg: file});
        },
        'blob'
      );
    }
  }

  storeContent = (e) => {
    this.setState({content: e});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('file', this.state.banner);
    data.append('file', this.state.bannerSm);
    data.append('file', this.state.bannerLg);

    const contribData = {
      type: this.state.type,
      topic: this.state.topic,
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
    };

    this.props.addContribution(contribData, this.props.history, data);
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
                <input type="file" name="file" onChange={this.bannerAdded} className="custom-file-input clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
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
            <Quill storeQuillDelta={this.storeContent} />
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
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { addContribution })(
  withRouter(AddContribution)
);
