import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';
import './Footer.css';

class Footer extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };


  onSubmit = e => {
    e.preventDefault();

    // Close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Modal
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
            Submit
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
                <div className="navbar-nav flex-row position-absolute fixed-top border-bottom">
                  <a href="/" className="dropdown-item text-right"><i className="fab fa-facebook-f"></i></a>
                  <a href="/" className="dropdown-item text-right"><i className="fab fa-instagram"></i></a>
                  <a href="/" className="dropdown-item text-right"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="container pl-1 pr-1">
                  <div className="list-group mt-4 pt-1">
                    <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-clock mr-2"></i> Historia</a>
                    <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-bullseye mr-2"></i> Mision</a>
                    <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-hands-helping mr-2"></i> Contribuir</a>
                  </div>
                </div>
                <div className="navbar-nav flex-row position-absolute border-top w-100 fixed-bottom">
                  <p className="mb-1 mt-1 ml-auto mr-auto font-color">&copy; {new Date().getFullYear()} Vendaval</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropup">
              <button type="button" id="changeLanguage" className="btn btn-outline-info text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fal fa-comment"></i></button>
              <div className="dropdown-menu dropdown-menu-right messages-container" aria-labelledby="changeLanguage">
                <div className="">
                  <h1 className="h4 font-weight-bold pl-2 border-bottom">Contactar</h1>
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
    )
  }
}

// <table className="table table-hover media-table-margin mb-0">
//   <tbody>
//     <tr>
//       <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-clock mr-2"></i> Historia</a>
//     </tr>
//     <tr>
//     <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-bullseye mr-2"></i> Mision</a>
//     </tr>
//     <tr>
//       <a href="#{}" className="list-group-item list-group-item-action"><i className="fal fa-hands-helping mr-2"></i> Contribuir</a>
//     </tr>
//   </tbody>
// </table>

export default Footer;
