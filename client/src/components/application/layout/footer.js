import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalFooter } from 'reactstrap';

class Footer extends Component{
    constructor() {
        super();
        this.state = {
          modal: false,
        };
      }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onSubmit = () => {
    };

  render(){
        return (
            <div>
                <Modal
                className="mt-5"
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                <div className="modal-header">
                    <h5 className="modal-title text-center w-100">
                        <FormattedMessage
                        id="navigation.aboutHeader"
                        defaultMessage="Our Story"
                        />
                    </h5>
                </div>
                <div className="modal-body">
                    <p>Uniting the world against all odds..</p>
                </div>
                <ModalFooter
                className="justify-content-center"
                >
                    <Button
                    className="m-0"
                    color="danger"
                    onClick={this.toggle}
                    >
                    <i className="fas fa-heart mr-2"></i>
                    <FormattedMessage
                        id="navigation.aboutOptionsDonate"
                        defaultMessage="Donate"
                    />
                    </Button>
                </ModalFooter>
                </Modal>

                <div className="footer">

                    <div className="socialmedia-container d-flex flex-row justify-content-center">
                        <a href="https://www.facebook.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-facebook-f fa-2x"></i></a>
                        <a href="https://twitter.com/vendaval_space" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-twitter fa-2x"></i></a>
                        <button
                        type="button"
                        className="bg-transparent btn p-2 text-light"
                        onClick={this.toggle}
                        >
                            <i className="fas fa-users fa-2x"></i>
                        </button>
                        <a href="https://www.instagram.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-instagram fa-2x"></i></a>
                        <a href="https://www.youtube.com/channel/UCWyiBVKzOekw2Q0Wygvx4aw" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-youtube fa-2x"></i></a>
                    </div>

                    <div className="text-center d-flex flex-row justify-content-center">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Privacy</a>
                    <p className="p-2 text-light"> | </p>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Terms & Conditions</a>
                    <p className="p-2 text-light"> | </p>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Cookies</a>
                    </div>

                    <div className="text-center">
                        <p className="mb-1 mt-1 ml-auto mr-auto text-light">&copy; {new Date().getFullYear()} Vendaval</p>
                    </div>
                </div>
            </div>
            );
 }
}
export default Footer;
