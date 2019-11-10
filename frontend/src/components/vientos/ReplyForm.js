import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup.js';
import { addReply } from '../../actions/vientosActions';

import {FormattedMessage} from 'react-intl';

import Div from '../application/main/common/styled/div';
import InputArea from '../application/main/common/styled/inputArea';
import Button from '../application/main/common/styled/button';

class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      replyPlaceholder: '',
      errors: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.errors!==prevProps.application.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.errors});
    }
  }

  canBeSubmitted() {
    const x = this.state.text.length > 10;
    return x===true;
  }

  showErrors = (e) => {
    if (this.state.text.length < 10) {
      this.setState({ errors: {
        text: e
      } });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { vientoID, commentID } = this.props;

    const newComment = {
      text: this.state.text,
    };

    if (this.state.text.length > 10) {
      this.props.addReply(vientoID, commentID, newComment)
      this.setState({ text: '' });
      this.props.closeReply();
    }
  }

  render() {
    const { errors } = this.state;
    const { application } = this.props;
    const isEnabled = this.canBeSubmitted();

    let replyPlaceholder;
    let replyLabel;

    if (application.language === 'es') {
      replyPlaceholder = 'Responde al contribución';
      replyLabel = 'Línea por dejando un commentario';
    } else {
      replyPlaceholder = 'Reply to the post';
      replyLabel = 'Field for leaving a comment';
    }

    return (
      <Div className="d-flex flex-direction-column mt-50px ml-neg-70px" paddingStyled={application.settings.appPadding}>
        <FormattedMessage
          id="viento.replyMessage"
          defaultMessage="Leave a reply:"
        />
        <form onSubmit={this.onSubmit}>
          <Div className="mt-10px" backgroundStyled={application.mode.primary} colorStyled={application.theme.primary}>
            <InputArea
              placeholder={replyPlaceholder}
              name="text"
              aria-label={replyLabel}
              className="outer-shadow border-1 pl-10px pr-10px pt-10px min-w-200px"
              value={this.state.text}
              onChange={this.onChange}
              backgroundStyled={errors.text ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.text ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.text ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
            />
            {errors.text && <div className="invalid-feedback">{errors.text}</div>}
          </Div>
          <Button 
            type="submit"
            onClick={() => this.showErrors('Post must be between 10 and 300 characters')}
            className={(isEnabled !== true ? `disabled` : `clickable`) + ` outer-shadow p-5px mt-10px`}
            transitionStyled={application.transitions.general} 
            backgroundStyled={application.theme.primaryThree} 
            backgroundHoverStyled={(isEnabled !== true ? application.theme.primaryQuarter : application.theme.primary)}
            colorStyled={application.mode.primary} 
            radiusStyled={application.settings.appRadius}
          >
            Submit
          </Button>
        </form>
      </Div>
    );
  }
}

ReplyForm.propTypes = {
  addReply: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  commentID: PropTypes.string.isRequired,
  vientoID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { addReply })(ReplyForm);