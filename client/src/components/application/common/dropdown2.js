import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Dropdown2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      filterSearch1: 'Title',
      filterSearch2: 'Title',
      filterSearch3: 'Title',
      filterSearch4: 'Title',
    }
  }
  
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  updateFilterSearch1 = (text, varb) => {
    console.log(varb);
    this.setState({
      filterSearch1: text
    });
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
      <div className="dd-header" onClick={() => this.toggleList()}>
          <button type="button" className="btn btn-outline-info dd-fix-button"><i className="fal fa-text-height"></i></button>
      </div>
       {listOpen && 
        <ul className="dd-list2">
            <li onClick={(e) => this.updateFilterSearch1(e, 'Title')} className="dropdown-item text-info p-0"><i className="fal fa-text-height"></i></li>
            <li onClick={(e) => this.updateFilterSearch1(e, 'Author')} className="dropdown-item text-info p-0"><i className="fal fa-user"></i></li>
            <li onClick={(e) => this.updateFilterSearch1(e, 'Wind')} className="dropdown-item text-info p-0"><i className="fal fa-wind"></i></li>
            <li onClick={(e) => this.updateFilterSearch1(e, 'Category')} className="dropdown-item text-info p-0"><i className="fal fa-archive"></i></li>
        </ul>}
      </div>
    )
  }
}

export default Dropdown2;
