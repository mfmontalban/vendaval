import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup.js';
import { addComment } from '../../actions/vientosActions';

import {FormattedMessage} from 'react-intl';

import Div from '../application/main/common/styled/div';
import InputArea from '../application/main/common/styled/inputArea';
import Button from '../application/main/common/styled/button';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      replyPlaceholder: '',
      errors: {}
    };
  }

  componentDidMount() {
    let replyPlaceholder;
    let replyLabel;

    if (this.props.application.language.setLanguage === 'es') {
      replyPlaceholder = 'Responde al contribución';
      replyLabel = 'Línea por dejando un commentario';
    } else {
      replyPlaceholder = 'Reply to the post';
      replyLabel = 'Field for leaving a comment';
    }

    this.setState({
      replyLabel: replyLabel,
      replyPlaceholder: replyPlaceholder,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.settings!==prevProps.application.settings){
      
      let replyPlaceholder;
      let replyLabel;

      console.log('rttt')

      if (this.props.application.language === 'es') {
        replyPlaceholder = 'Responde al contribución';
        replyLabel = 'Línea por dejando un commentario';
      } else {
        replyPlaceholder = 'Reply to the post';
        replyLabel = 'Field for leaving a comment';
      }

      this.setState({
        replyLabel: replyLabel,
        replyPlaceholder: replyPlaceholder,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { vientoId } = this.props;

    const newComment = {
      text: this.state.text,
      category: this.props.category
    };

    this.props.addComment(vientoId, newComment);
    this.setState({ text: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { application } = this.props;

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
      <Div className="d-flex flex-direction-column" paddingStyled={application.settings.appPadding}>
        <FormattedMessage
          id="viento.commentMessage"
          defaultMessage="Leave a comment:"
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
              backgroundStyled={errors.name ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.name ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.name ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
            />
          </Div>
          <Button type="submit" className="outer-shadow p-5px mt-10px" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryThree} backgroundHoverStyled={application.theme.primary} colorStyled={application.mode.primary} radiusStyled={application.settings.appRadius}>
            Submit
          </Button>
        </form>
      </Div>
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