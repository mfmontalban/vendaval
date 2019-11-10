import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setSort } from '../../../../actions/applicationActions';

import Spinner from './spinner';

class Sortbutton extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      listOpen2: false,
      sortRecent: {
        0: false,
        1: false
      },
      sortLikes: {
        0: false,
        1: false
      },
      sortShares: {
        0: false,
        1: false
      },
      sortComments: {
        0: false,
        1: false
      },
    }
  }

  componentWillMount() {
    this.setState({
      sort1:this.props.active
    });
  }

  handleDragging = (e, order, title, icon) => {
    let x;
    let y;
    x = document.getElementsByClassName("mydiv");
    y = document.getElementsByClassName(`mydiv${order}`);

    let zx0;
    let zy0;

    let zx1;
    let zy1;

    let zx2;
    let zy2;

    let zx3;
    let zy3;

    let zx4;
    let zy4;

    zx0 = y[0].offsetLeft;
    zy0 = y[0].offsetTop;

    zx1 = x[0].offsetLeft;
    zy1 = x[0].offsetTop;

    zx2 = x[1].offsetLeft;
    zy2 = x[1].offsetTop;

    zx3 = x[2].offsetLeft;
    zy3 = x[2].offsetTop;

    zx4 = x[3].offsetLeft;
    zy4 = x[3].offsetTop;

    console.log(x)

    if (e.clientY > (zy1 + 369 + (35 * 0)) && e.clientY < (zy1 + 369 + (35 * 1))) {
      console.log('Over Sort#1')
      if (title != x[0].childNodes[1].innerText) {
        console.log('whoooa! new spot')

        x[0].children[1].firstChild.innerText = title
        x[0].children[1].children[1].dataset.icon = icon

      } else {
        console.log('..same spot')
      }
    }

    if (e.clientY > (zy1 + 369 + (35 * 1)) && e.clientY < (zy1 + 369 + (35 * 2))) {
      console.log('Over Sort#2')
      if (title != x[1].childNodes[1].innerText) {
        console.log('whoooa! new spot')
        x[1].children[1].firstChild.innerText = title
        x[1].children[1].children[1].dataset.icon = icon
      } else {
        console.log('..same spot')
      }
    }

    if (e.clientY > (zy1 + 369 + (35 * 2)) && e.clientY < (zy1 + 369 + (35 * 3))) {
      console.log('Over Sort#3')
      if (title != x[2].childNodes[1].innerText) {
        console.log('whoooa! new spot')
        x[2].children[1].firstChild.innerText = title
        x[2].children[1].children[1].dataset.icon = icon
      } else {
        console.log('..same spot')
      }
    }

    if (e.clientY > (zy1 + 369 + (35 * 3)) && e.clientY < (zy1 + 369 + (35 * 4))) {
      console.log('Over Sort#4')
      if (title != x[3].childNodes[1].innerText) {
        console.log('whoooa! new spot')
        x[3].children[1].firstChild.innerText = title
        x[3].children[1].children[1].dataset.icon = icon
      } else {
        console.log('..same spot')
      }
    }


    function dragElement(elmnt, order) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (elmnt[order].getElementsByClassName("mydivheader")) {
        // if present, the header is where you move the DIV from:
        console.log(elmnt[order].getElementsByClassName("mydivheader"));
        elmnt[order].getElementsByClassName("mydivheader").onmousedown = dragMouseDown;
      } else {
        console.log(`what's up Lee`);
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        console.log('yooo');
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        console.log('dawwg');
        document.onmouseup = null;
        document.onmousemove = null;
      }

      
    }
  }

  setSort = (e, title, direction) => {
    // this.setState({
    //   ['sort'+ direction]: true
    // });

    let x;
    x = 'sort' + title;

    if (direction == 'Up') {
      this.setState({
        [x]: {
          0: true,
          1: false
        }
      });
    } else {
      this.setState({
        [x]: {
          0: false,
          1: true
        }
      });
      // this.props.onGetLanguage({2: search2});
    }

    // this.props.setSort(title, direction);
  }

  render(){
    const{title, icon, icon2, active, order, unicode, options} = this.props
    const{listOpen} = this.state

    let x;
    x = `sort` + title

    let sortContent;

    if (options === null) {
      // Do nothing
    } else {
      if (options.length > 0) {
        sortContent = options.map(option => {
          return <li key={option} className='dropdown-item text-info'>{option}</li>
        });

      }
    }

    return(
          <div className={`d-flex`}>

            {listOpen && 
            <ul className="dd-list2 scroll-container">
              {sortContent}
            </ul>}

            <div className="align-middle text-info dd-fix-button4">
              
              <span className="pr-2 title-shift">
              {title}
              {/* <FormattedMessage
                id="navigation.login"
                defaultMessage="Login"
              /> */}
              </span>
              <i className={`fal ${icon}`}></i>
            </div>

            <button 
              draggable
              onDrag={(e) => this.handleDragging(e, order, title, icon2)}
              onDrop={e => this.handleDrop(e)}
              // onDragOver={(e => this.handleDragOver(e))}

              type="button" 
              className='btn text-info dd-fix-button3 mydivheader'
            >
              <i className="fal fa-sort"></i>
            </button>
            
          </div>

    )
  }
}

Sortbutton.propTypes = {
  setSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { setSort })(Sortbutton);