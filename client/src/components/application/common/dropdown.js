import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFiltersText } from '../../../actions/applicationActions';

import { FormattedMessage } from 'react-intl';
import Dropdown2 from './dropdown2';
import Selectdown2 from './selectdown2';
import Selectdown3 from './selectdown3';
import Selectdown4 from './selectdown4';
import Sortdown from './sortbutton';

class Dropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      filter: 'Title',
      filterOrder: {
        1: '',
        2: '',
        3: '',
        4: ''
      },
      filterSearch1: '',
      filterSearch2: '',
      filterSearch3: '',
      filterSearch4: '',
      sortOrder: {
        1: '',
        2: '',
        3: '',
        4: ''
      },
      sort1: '',
      sort2: '',
      sort3: '',
      sort4: '',
    }
  }

  updateSearch = (e) => {

    this.setState({
      filter: e.target.value,
    });

    // this.props.setFiltersText({
    //   1: this.state.filterSearch1,
    //   2: this.state.filterSearch2,
    //   3: this.state.filterSearch3,
    //   4: this.state.filterSearch4,
    // });
  }
  
//   componentDidUpdate(){
//     const { listOpen } = this.state
//     setTimeout(() => {
//       if(listOpen){
//         window.addEventListener('click', this.close)
//       }
//       else{
//         window.removeEventListener('click', this.close)
//       }
//     }, 0)
//   }

//   componentWillUnmount(){
//     window.removeEventListener('click', this.close)
//   }

//   close = (timeOut) => {
//     this.setState({
//       listOpen: false
//     })
//   }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  updateFilterSearch1 = (e) => {
    let counter = 0;

    if (this.state.filter == '') {
      if (this.state.filterOrder[2] > this.state.filterOrder[1]) {
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                2: this.state.filterOrder[2] - 1
            },
        }))
      }
      if (this.state.filterOrder[3] > this.state.filterOrder[1]) {
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                3: this.state.filterOrder[3] - 1
            },
        }))
      }
      if (this.state.filterOrder[4] > this.state.filterOrder[1]) {
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                4: this.state.filterOrder[4] - 1
            },
        }))
      }
      this.setState(prevState => ({
          filterOrder: {
              ...prevState.filterOrder,
              1: ''
          },
      }))
    } else {
      if (this.state.filterOrder[2] != '') {
        counter = counter + 1;
      }
      if (this.state.filterOrder[3] != '') {
        counter = counter + 1;
      }
      if (this.state.filterOrder[4] != '') {
        counter = counter + 1;
      }
      counter = counter + 1
      
      if (this.state.filterSearch1.length > 1) {
          
        if (this.state.filterOrder[2] > this.state.filterOrder[1]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  2: this.state.filterOrder[2] - 1
              },
          }))
        }
        if (this.state.filterOrder[3] > this.state.filterOrder[1]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  3: this.state.filterOrder[3] - 1
              },
          }))
        }
        if (this.state.filterOrder[4] > this.state.filterOrder[1]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  4: this.state.filterOrder[4] - 1
              },
          }))
        }

        this.setState(prevState => ({
          filterOrder: {
              ...prevState.filterOrder,
              1: counter
          },
          filterSearch1: this.state.filter
        }))
        
      } else {
        this.setState(prevState => ({
          filterOrder: {
              ...prevState.filterOrder,
              1: counter
          },
          filterSearch1: this.state.filter
        }))
      }
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false
      })
    }
  }
  
  getLanguage = (e) => {
    let x;
    let y;
    let z;
    let counter = 0;

    const {filters} = this.props.application;

    if (Object.keys(e) == 2) {
      y = Object.values(e);
      z = y + ""
      if (z == "") {
        if (this.state.filterOrder[1] > this.state.filterOrder[2]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  1: this.state.filterOrder[1] - 1
              },
          }))
        }
        if (this.state.filterOrder[3] > this.state.filterOrder[2]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  3: this.state.filterOrder[3] - 1
              },
          }))
        }
        if (this.state.filterOrder[4] > this.state.filterOrder[2]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  4: this.state.filterOrder[4] - 1
              },
          }))
        }
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                2: ''
            },
            filterSearch2: ''
        }))
      } else {
        if (this.state.filterOrder[1] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[3] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[4] != '') {
          counter = counter + 1;
        }
        counter = counter + 1
        
        if (this.state.filterSearch2.length > 1) {
          
          if (this.state.filterOrder[1] > this.state.filterOrder[2]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    1: this.state.filterOrder[1] - 1
                },
            }))
          }
          if (this.state.filterOrder[3] > this.state.filterOrder[2]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    3: this.state.filterOrder[3] - 1
                },
            }))
          }
          if (this.state.filterOrder[4] > this.state.filterOrder[2]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    4: this.state.filterOrder[4] - 1
                },
            }))
          }

          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                2: counter
            },
            filterSearch2: z
          }))
          
        } else {
          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                2: counter
            },
            filterSearch2: z
          }))
        }
      }

    }
    if (Object.keys(e) == 3) {
      y = Object.values(e);
      z = y + ""
      if (z == "") {
        if (this.state.filterOrder[1] > this.state.filterOrder[3]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  1: this.state.filterOrder[1] - 1
              },
          }))
        }
        if (this.state.filterOrder[2] > this.state.filterOrder[3]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  2: this.state.filterOrder[2] - 1
              },
          }))
        }
        if (this.state.filterOrder[4] > this.state.filterOrder[3]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  4: this.state.filterOrder[4] - 1
              },
          }))
        }
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                3: ''
            },
            filterSearch3: ''
        }))
      } else {
        if (this.state.filterOrder[1] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[2] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[4] != '') {
          counter = counter + 1;
        }
        counter = counter + 1

        if (this.state.filterSearch3.length > 1) {
          
          if (this.state.filterOrder[1] > this.state.filterOrder[3]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    1: this.state.filterOrder[1] - 1
                },
            }))
          }
          if (this.state.filterOrder[2] > this.state.filterOrder[3]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    2: this.state.filterOrder[2] - 1
                },
            }))
          }
          if (this.state.filterOrder[4] > this.state.filterOrder[3]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    4: this.state.filterOrder[4] - 1
                },
            }))
          }

          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                3: counter
            },
            filterSearch3: z
          }))
          
        } else {
          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                3: counter
            },
            filterSearch3: z
          }))
        }
      }
    }
    if (Object.keys(e) == 4) {
      y = Object.values(e);
      z = y + ""

      if (z == "") {
        if (this.state.filterOrder[1] > this.state.filterOrder[4]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  1: this.state.filterOrder[1] - 1
              },
          }))
        }
        if (this.state.filterOrder[2] > this.state.filterOrder[4]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  2: this.state.filterOrder[2] - 1
              },
          }))
        }
        if (this.state.filterOrder[3] > this.state.filterOrder[4]) {
          this.setState(prevState => ({
              filterOrder: {
                  ...prevState.filterOrder,
                  3: this.state.filterOrder[3] - 1
              },
          }))
        }
        this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                4: ''
            },
            filterSearch4: ''
        }))
      } else {
        //how to differentiate between new addition v. updating value

        if (this.state.filterOrder[1] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[2] != '') {
          counter = counter + 1;
        }
        if (this.state.filterOrder[3] != '') {
          counter = counter + 1;
        }
        counter = counter + 1

        if (this.state.filterSearch4.length > 1) {
          
          if (this.state.filterOrder[1] > this.state.filterOrder[4]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    1: this.state.filterOrder[1] - 1
                },
            }))
          }
          if (this.state.filterOrder[2] > this.state.filterOrder[4]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    2: this.state.filterOrder[2] - 1
                },
            }))
          }
          if (this.state.filterOrder[3] > this.state.filterOrder[4]) {
            this.setState(prevState => ({
                filterOrder: {
                    ...prevState.filterOrder,
                    3: this.state.filterOrder[3] - 1
                },
            }))
          }

          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                4: counter
            },
            filterSearch4: z
          }))
          
        } else {
          this.setState(prevState => ({
            filterOrder: {
                ...prevState.filterOrder,
                4: counter
            },
            filterSearch4: z
          }))
        }
      }
    }

    // this.props.setFiltersText({
    //   1: this.state.filterSearch1,
    //   2: this.state.filterSearch2,
    //   3: this.state.filterSearch3,
    //   4: this.state.filterSearch4,
    // });
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render(){
    const{list, vientos} = this.props
    const{listOpen, headerTitle} = this.state
    const { todos, completedTasks} = this.state;

    return(
      <div ref={this.setWrapperRef} className="dd-wrapper">
      <div className="dd-header" onClick={() => this.toggleList()}>
          <button type="button" className="btn btn-outline-info rounded dd-header-title"><i className="fal fa-filter"></i></button>
      </div>
       {listOpen && 

        <div className="dd-list">
            <div className="d-flex justify-content-between">
              <label className="dd-label">
                  <FormattedMessage
                  id="navigation.filter"
                  defaultMessage="Filter"
                  />
              </label>

              <label className="dd-label2">
                  <FormattedMessage
                  id="navigation.clearAll"
                  defaultMessage="Clear"
                  />
              </label>
            </div>

            <div className="dropdown-divider"></div>

            <div className="d-flex justify-content-center p-1">
              {/* <button type="button" className="btn btn-outline-info dd-fix-button dd-set-height p1 fa-stack fa-1xx has-badge" data-count="3">
                <i className="p3 fal fa-text-height fa-stack-1x" data-count="5"></i>
              </button> */}
              <button type="button" className={(this.state.filterSearch1.length > 1 ? 'btn btn-info dd-fix-button' : 'btn btn-outline-info dd-fix-button')}>
                <i className="fal fa-text-height"></i>
              </button>
              <input
                  type="text"
                  value={this.state.filter}
                  onChange={this.updateSearch}
                  className="dd-input form-control"
                  aria-label="Text input"
                  placeholder={this.state.filter}
              >
              </input>
              <button type="button" onClick={this.updateFilterSearch1} className="btn btn-outline-info dd-fix-button2"><i className="fal fa-angle-right"></i></button>
            </div>

            <div className="d-flex justify-content-between p-1">
                <Selectdown2
                title="Select location"
                vientos={this.props.vientos}
                active={this.state.filterSearch2}
                onGetLanguage={this.getLanguage}
                />
                <Selectdown3
                title="Select location"
                vientos={this.props.vientos}
                active={this.state.filterSearch3}
                onGetLanguage={this.getLanguage}
                />
                <Selectdown4
                title="Select location"
                vientos={this.props.vientos}
                active={this.state.filterSearch4}
                onGetLanguage={this.getLanguage}
                />
            </div>

            <div className="dropdown-divider"></div>

            <div className="sort-container">

              <Sortdown
                title="Recent"
                icon="fa-hourglass-start"
                icon2="hourglass-start"
                order="0"
                active={this.state.sort1}
                // onGetLanguage={this.getLanguage}
              />
              <Sortdown
                title="Likes"
                icon="fa-thumbs-up"
                icon2="thumbs-up"
                order="1"
                active={this.state.sort2}
                // onGetLanguage={this.getLanguage}
              />
              <Sortdown
                title="Shares"
                icon="fa-share-square"
                icon2="share-square"
                order="2"
                active={this.state.sort3}
                // onGetLanguage={this.getLanguage}
              />
              <Sortdown
                title="Comments"
                icon="fa-comments"
                icon2="comments"
                order="3"
                active={this.state.sort4}
                // onGetLanguage={this.getLanguage}
              />
            </div>

        </div>}
      </div>
    )
  }
}

Dropdown.propTypes = {
  setFiltersText: PropTypes.func.isRequired,
  Dropdown: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
  Dropdown: state.Dropdown,
  visible: state.visible
});

export default connect(mapStateToProps, { setFiltersText })(Dropdown);

