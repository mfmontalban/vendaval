import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Spinner from './spinner';

class Selectdown3 extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      listOpen2: false,
      headerTitle: this.props.title,
      filterSearch3: '',
    }
  }
  
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      filterSearch3:this.props.active
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
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

  updateFilterSearch3 = (text, search3) => {
    if (this.state.filterSearch3 == search3) {
      this.setState({
        filterSearch3: ''
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({3: ''});
    } else {
      this.setState({
        filterSearch3: search3
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
      this.props.onGetLanguage({3: search3});
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
          return viento.user.name;
        });
        authorContent2 = authorContent.filter((author, index) => {
          return authorContent.indexOf(author) >= index;
        })
        authorContent3 = authorContent2.map(viento => {
          return <li key={viento} onClick={(e) => this.updateFilterSearch3(e, viento)} className={(this.state.filterSearch3 == viento ? 'dropdown-item text-white bg-info' : 'dropdown-item text-info')}>{viento}</li>
        });

      }
    }

    return(
      <div className="dd-wrapper pl-1 pr-1">
        <div className="dd-header" onClick={() => this.toggleList()}>
            <button type="button" className={(this.state.filterSearch3.length > 1 ? 'btn btn-info' : 'btn btn-outline-info')}>Author</button>
        </div>
        {listOpen && 
          <ul ref={this.setWrapperRef} className="dd-list3 scroll-container">
            {authorContent3}
          </ul>}
      </div>
    )
  }
}

export default Selectdown3;
