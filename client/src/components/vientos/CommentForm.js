import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../application/common/textAreaFieldGroup.js';
import { addComment } from '../../actions/vientosActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { admin, vientoId } = this.props;

    const newComment = {
      text: this.state.text,
      avatar: admin.avatar,
      handle: admin.handle,
      name: admin.name,
    };

    this.props.addComment(vientoId, newComment);
    this.setState({ text: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          {/* <div className="card-header bg-info text-white">
            Make a comment...
          </div> */}
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  vientoId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { addComment })(CommentForm);