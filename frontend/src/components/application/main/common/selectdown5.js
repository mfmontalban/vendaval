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
      filterSearch5: '',
      startDate: new Date(11/20/2018),
      endDate: new Date()

    }
  }
  
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      filterSearch5:this.props.active
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

  handleChange2 = (date) => {
    this.setState({
      endDate: date
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

  updateFilterSearch5 = (text, search4) => {
    if (this.state.filterSearch5 == search4) {
      this.setState({
        filterSearch5: ''
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({4: ''});
    } else {
      this.setState({
        filterSearch5: search4
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({4: search4});
    }
  }

  render(){
    let vientos = [
      'Past Week',
      'Past Month',
      'Past Year',
    ]


    const{listOpen, headerTitle} = this.state

    let loadingContent;
    let authorContent;
    let authorContent2;
    let authorContent3;

    if (vientos === null || vientos.loading) {
      loadingContent = <Spinner />;
    } else {
      if (vientos.length > 0) {
        authorContent3 = vientos.map(viento => {
          return <li key={viento} onClick={(e) => this.updateFilterSearch5(e, viento)} className={(this.state.filterSearch5 == viento ? 'dropdown-item text-white bg-info' : 'dropdown-item text-info')}>{viento}</li>
        });

      }
    }

    return(
      <div className="dd-wrapper">
        
        {/* <div className="dd-label3 text-info d-flex">
          <div className="mt-8px">
            All Time
          </div>
        </div> */}

        <div className="dd-wrapper d-flex justify-content-center">
          <div className="dd-header" onClick={() => this.toggleList()}>
              <button type="button" className={(this.state.filterSearch5.length > 1 ? 'btn btn-info' : 'btn btn-outline-info')}>Current Week</button>
          </div>
          {listOpen && 
            <ul ref={this.setWrapperRef} className="dd-list5 scroll-container">
              <li onClick={(e) => this.updateFilterSearch5(e, 'Current Week')} className={(this.state.filterSearch5 == 'Current Week' ? 'dropdown-item text-white bg-info' : 'dropdown-item text-info')}>Curent Week</li>
              <div className="dropdown-divider"></div>
              {authorContent3}
              <div className="dropdown-divider"></div>
              <li onClick={(e) => this.updateFilterSearch5(e, 'Range')} className={(this.state.filterSearch5 == 'Range' ? 'dropdown-item text-white bg-info' : 'dropdown-item text-info')}>Range</li>
            </ul>}
        </div>
        
        {/* <div className="dd-label3 text-info d-flex">
          <div className="mt-8px">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
          <div className="date-separator">-</div>
          <div className="mt-8px2">
            <DatePicker
              popperPlacement='top-start'
              selected={this.state.endDate}
              onChange={this.handleChange2}
            />
          </div>
        </div> */}
      </div>
    )
  }
}

export default Selectdown4;
