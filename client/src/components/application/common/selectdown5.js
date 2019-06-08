import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import Spinner from './spinner';
import { FormattedMessage } from 'react-intl';

class Selectdown4 extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      listOpen2: false,
      headerTitle: this.props.title,
      filterSearch1: '',
      filterSearch2: '',
      filterSearch3: '',
      filterSearch4: '',
      startDate: new Date(11/20/2018),
      endDate: new Date()

    }
  }
  
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      filterSearch4:this.props.active
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false,
        listOpen2: true
      })
      setTimeout(() => {
        this.setState({ listOpen2: false });
      }, 250);
    }
  }

  toggleList = () => {
    if (this.state.listOpen2 == false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }))
    }
  }

  updateFilterSearch4 = (text, search4) => {
    if (this.state.filterSearch4 == search4) {
      this.setState({
        filterSearch4: ''
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({4: ''});
    } else {
      this.setState({
        filterSearch4: search4
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({4: search4});
    }
  }

  render(){
    const{vientos} = this.props
    const{listOpen, headerTitle} = this.state

    let loadingContent;
    let authorContent;
    let authorContent2;
    let authorContent3;

    if (vientos === null || vientos.loading) {
      loadingContent = <Spinner />;
    } else {
      if (vientos.length > 0) {
        authorContent = vientos.map(viento =>{
          return viento.topic;
        });
        authorContent2 = authorContent.filter((author, index) => {
          return authorContent.indexOf(author) >= index;
        })
        authorContent3 = authorContent2.map(viento => {
          return <li key={viento} onClick={(e) => this.updateFilterSearch4(e, viento)} className={(this.state.filterSearch4 == viento ? 'dropdown-item text-white bg-info' : 'dropdown-item text-info')}>{viento}</li>
        });

      }
    }

    return(
      <div className="dd-wrapper">
        <div className="dd-label3 text-info d-flex">
          <div className="mt-8px">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
          <div className="date-separator">-</div>
          <div className="mt-8px">
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Selectdown4;
