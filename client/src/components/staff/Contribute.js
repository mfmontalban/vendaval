import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContribution } from '../../actions/staffActions';


class AddContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const contribData = {
      title: this.state.title,
      description: this.state.description
    };

    this.props.addContribution(contribData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="col-md-8 m-auto">
          <Link to="/staff/dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-6 text-center mt-3">Contribution</h1>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Images</button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#{}">Banner</a>
                  <a className="dropdown-item" href="#{}">Pictures</a>
                </div>
              </div>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose Image</label>
              </div>
            </div>


            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />
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
