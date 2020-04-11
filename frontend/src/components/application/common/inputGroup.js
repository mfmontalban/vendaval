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

        <Div className="border-1 border-right-0" transitionStyled={`${application.transitions.general}`} borderStyled={`${application.theme.primary}`} borderHoverStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusLeft}`} backgroundStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`}>
          <Div className="p-10px" colorStyled={application.mode.primary}>
            <i className={icon} />
          </Div>
        </Div>
        <Input
          className={classnames('pl-5px border-1 border-0-left', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          backgroundStyled={application.mode.primary}
          colorStyled={`${application.theme.primary}`}
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