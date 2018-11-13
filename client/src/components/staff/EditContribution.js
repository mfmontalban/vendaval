import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { editContribution, getContributionByID } from '../../actions/staffActions';
import isEmpty from '../../validation/is-empty';

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.staff.contributions) {
      const contribution = nextProps.staff.contributions;

      // If profile field doesnt exist, make empty string
      contribution.title = !isEmpty(contribution.title) ? contribution.title : '';
      contribution.description = !isEmpty(contribution.description) ? contribution.description : '';

      // Set component fields state
      this.setState({
        title: contribution.title,
        description: contribution.description
      });
    }
  }

  onDeleteClick(id) {
    this.props.deleteContribution(id);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const contribData = {
      title: this.state.title,
      description: this.state.description,
    };

    this.props.editContribution(id, contribData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const { contributions } = this.props.staff;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="col-md-8 m-auto">
          <Link to="/staff/dashboard" className="btn btn-light">
            Dashboard
          </Link>
          <div className="btn-group">
            <button type="button" className="bg-transparent border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fal fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/staff/contribution/view/${contributions._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>View</Link>
              <div className="dropdown-divider"></div>
              <a
                href="#{}"
                className="dropdown-item text-dark"
                onClick={this.onDeleteClick.bind(this, contributions._id)}
                >
                <i className="fal fa-trash mr-2"></i>Delete
              </a>
            </div>
          </div>
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

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  editContribution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  staff: state.staff
});

export default connect(mapStateToProps, { editContribution, getContributionByID })(withRouter(Contribution));
