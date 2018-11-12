import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';


import './Header.css';
import './Footer.css';

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userProfile = this.props.profile.user;

    let profileLink;

    if (userProfile === null || '') {
      profileLink =
      <Link to="/profile/create" className="dropdown-item text-right"><span className="pr-2">Profile</span><i className="fal fa-id-badge"></i></Link>
    } else {
      profileLink =
      <Link to={`/communidad/${userProfile.handle}`} className="dropdown-item text-right"><span className="pr-2">Profile</span><i className="fal fa-id-badge"></i></Link>
    }

    const staffMenu = (
      <div>
        <Link to="/staff/dashboard" className="dropdown-item text-right"><span className="pr-2">Staff</span><i className="fal fa-tachometer-alt"></i></Link>
        <div className="dropdown-divider"></div>
        {profileLink}
        <Link to="/vientos" className="dropdown-item text-right"><span className="pr-2">Alertas</span><i className="fal fa-bell"></i></Link>
        <Link to="/vientos" className="dropdown-item text-right"><span className="pr-2">Favoritos</span><i className="fal fa-heart"></i></Link>
        <Link to="/seguridad" className="dropdown-item text-right"><span className="pr-2">Seguridad</span><i className="fal fa-wrench"></i></Link>
      </div>
    )

    const userMenu = (
      <div>
        {profileLink}
        <div className="dropdown-divider"></div>
        <Link to="/vientos" className="dropdown-item text-right"><span className="pr-2">Alertas</span><i className="fal fa-bell"></i></Link>
        <Link to="/vientos" className="dropdown-item text-right"><span className="pr-2">Favoritos</span><i className="fal fa-heart"></i></Link>
        <Link to="/seguridad" className="dropdown-item text-right"><span className="pr-2">Seguridad</span><i className="fal fa-wrench"></i></Link>
      </div>
    )

    const authLinks = (
        <nav>
          <button type="button" id="profile" className="btn btn-outline-info text-white rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px' }}
              title="Connect Gravatar to your account to display an image"
            />
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profile">
            {user.staff ? staffMenu : userMenu}
            <div className="dropdown-divider"></div>
            <Link
              to="/login"
              onClick={this.onLogoutClick.bind(this)}
              className="dropdown-item text-right"
            >
              <span className="pr-2">Logout</span>
              <i className="fal fa-sign-out-alt"></i>
            </Link>
          </div>
        </nav>
    );

    const guestLinks = (
      <div>
        <button type="button" id="profile" className="btn btn-outline-info text-white rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img alt="" /><i className="fal fa-user"></i></button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profile">
          <Link to="/login" className="dropdown-item text-right"><span className="pr-2">Iniciar</span><i className="fal fa-sign-in"></i></Link>
          <Link to="/register" className="dropdown-item text-right"><span className="pr-2">Registrar</span><i className="fal fa-user-plus"></i></Link>
          <Link to="/forgot" className="dropdown-item text-right"><span className="pr-2">Olvidio</span><i className="fal fa-question-square"></i></Link>
        </div>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-info fixed-top flex-row justify-content-between p-0 top-nav-height z-1035">
          <div className="navbar-nav flex-row top-nav-component-height">
            <div className="input-group ml-2">
              <div className="input-group-prepend">
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link" id="button-addon2"><i className="fal fa-search"></i></button>
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="top-nav-item-icon-fix sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item clearSearch" href="#{}">Clear Selection</a>
                  <div role="separator" className="dropdown-divider"></div>
                  <a className="dropdown-item updateSearch" href="#{}">Participar</a>
                  <a className="dropdown-item updateSearch" href="#{}">Motivar</a>
                  <a className="dropdown-item updateSearch" href="#{}">Crear</a>
                </div>
              </div>
              <input type="text" className="top-nav-item form-control top-nav-component-height" aria-label="Text input with segmented dropdown button"></input>
              <div className="top-nav-item input-group-append">
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link search-padding"><i className="fal fa-angle-right"></i></button>
              </div>
            </div>
          </div>
          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              <button type="button" id="changeLanguage" className="btn dropdown-toggle bg-transparent nav-item nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                es
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="changeLanguage">
                <button className="dropdown-item text-right" type="button">Espanol</button>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top-2nd d-none d-flex flex-row justify-content-between">
          <div className="item">
            <div className="btn-group dropdown">
              <button type="button" id="profile" className="btn btn-outline-info text-white rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-bars"></i></button>
              <div className="dropdown-menu" aria-labelledby="profile">
                <Link to="/pensar" className="dropdown-item"><i className="fal fa-lightbulb mr-2"></i><span className="pr-2">Pensar</span></Link>
                <Link to="/educar" className="dropdown-item"><i className="fal fa-graduation-cap mr-2"></i><span className="pr-2">Educar</span></Link>
                <Link to="/crear" className="dropdown-item"><i className="fal fa-pencil mr-2"></i><span className="pr-2">Crear</span></Link>
              </div>
            </div>
          </div>

          <div className="item">
            <Link to="/vientos" className="bg-transparent"><img alt="Vendaval favicon" className="vientos" src="/favicon.ico" /></Link>
          </div>

          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top-2nd d-none d-xl-flex d-lg-flex d-md-flex flex-row flex-row justify-content-between">
          <Link className="navbar-brand mr-0 btn btn-outline-info text-white" to="/vientos">Vendaval</Link>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link ml-3" to="/vientos/pensar">Pensar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ml-3" to="/vientos/educar">Educar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ml-3" to="/vientos/crear">Crear</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-nav flex-row">
            <div className="form-inline d-block ml-2">
              <div className="btn-group dropdown">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </nav>

        <Modal
          className="mt-5"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
          toggle={this.toggle}
          >
          App Settings
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
              <h6>
                Accessibility
              </h6>
              <h6>
                Data
              </h6>
              <h6>
                Notifications
              </h6>
              <h6>
                Theme
              </h6>
              <h6>
                Font
              </h6>
                <ul>
                  <li>
                    Color
                  </li>
                  <li>
                    Size
                  </li>
                </ul>
              <h6>
                Sounds
              </h6>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.onSubmit}
            >
            Save
            </Button>
            <Button
              color="danger"
              onClick={this.toggle}
            >
            Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <nav className="bottom-nav-height navbar d-flex navbar-dark bg-dark fixed-bottom justify-content-between">
          <div className="item">
            <button
              type="button"
              className="btn btn-outline-info text-white"
              onClick={this.toggle}
            >
            <i className="fal fa-cog"></i>
            </button>
          </div>
          <div className="item d-flex flex-row">
            <div className="dropup">
              <button type="button" id="changeLanguage" className="btn btn-outline-info text-white ml-2 mr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fal fa-globe"></i></button>
              <div className="dropdown-menu media-container" aria-labelledby="changeLanguage">
                <p className="h5 w-100 text-center m-0 font-weight-bold">Nosotros</p>
                <div className="container p-0">
                  <div className="list-group">
                    <a href="#{}" className="list-group-item list-group-item-action rounded-0 border-right-0 border-left-0"><i className="fal fa-clock mr-2"></i> Historia</a>
                    <a href="#{}" className="list-group-item list-group-item-action border-right-0 border-left-0"><i className="fal fa-bullseye mr-2"></i> Mision</a>
                    <a href="#{}" className="list-group-item list-group-item-action rounded-0 border-right-0 border-left-0"><i className="fal fa-hands-helping mr-2"></i> Contribuir</a>
                  </div>
                </div>
                <div className="navbar-nav flex-row position-absolute border-top w-100 fixed-bottom">
                  <a href="https://www.facebook.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="dropdown-item text-right rounded-bottom-left"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="dropdown-item text-right"><i className="fab fa-instagram"></i></a>
                  <a href="https://twitter.com/vendaval_space" target="_blank" rel="noopener noreferrer" className="dropdown-item text-right rounded-bottom-right"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropup">
              <button type="button" id="changeLanguage" className="btn btn-outline-info text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fal fa-comment"></i></button>
              <div className="dropdown-menu dropdown-menu-right messages-container" aria-labelledby="changeLanguage">
                <div className="">
                  <h1 className="h5 font-weight-bold pl-2 border-bottom">Contactar</h1>
                  <div className="pl-2 pr-2 mb-2 position-absolute fixed-bottom border-top">
                    <div className="input-group mb-1 mt-2">
                      <input type="text" className="form-control" placeholder="Enter your name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Header
);
