import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Div from './styled/div';
import Input from './styled/input';

class InputGroup extends Component {
  render() {  
    const { application, error, icon, name, value, placeholder, onChange } = this.props;

    return (
      <div className="d-flex flex-direction-row justify-content-center p-5px">
        <Div className="p-10px border-leftButton-1" transitionStyled={`${application.transitions.general}`} borderStyled={`${application.theme.primary}`} borderHoverStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusLeft}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`}>
          <i className={icon} />
        </Div>
        <Input
          className={classnames('border-1', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          borderStyled={`${application.theme.primary}`} 
          radiusStyled={`${application.settings.appRadiusRight}`}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

InputGroup.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(InputGroup);