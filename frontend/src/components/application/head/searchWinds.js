import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { readApplicationTitles } from '../../../actions/applicationActions';

import { FormattedMessage } from 'react-intl';

import Div from '../main/common/styled/div'
import Container from '../main/common/styled/container'
import Button from '../main/common/styled/button'
import Input from '../main/common/styled/input'

class SearchWinds extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      search: '',
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidMount() {
    this.props.readApplicationTitles();
  }
  
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false
      })
    }
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  updateSearch = (e) => {
    this.setState({
      listOpen: true,
      search: e.target.value.substr(0, 20)
    });
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;
    const titlesContainer = this.props.application.titles;

    let searchContainer;
    let searchArticles;
    let searchResults;

    if (application.language === 'es') {
      searchArticles = 'Busca articulos';
    } else {
      searchArticles = 'Search for articles';
    }

    if (titlesContainer !== null) {
      if (this.state.search !== '') {
        const titles = titlesContainer.filter(
          (object) => {
            return object.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );
  
        searchResults = titles.map((title) => {
          return (
            <Link to={`/vientos/${title._id}`} className="result noUnderline" key={title._id} >
              <Div className="p-5px" transitionStyled={application.transitions.general} backgroundHoverStyled={application.theme.primaryQuarter} colorStyled={application.theme.primary}>
                {title.title}
              </Div>
            </Link>
          );
        });

        if (searchResults.length > 0) {
          searchContainer = 
            <div>
              {searchResults}
            </div>
        } else {
          searchContainer =
            <Div className="p-5px" transitionStyled={application.transitions.general} backgroundHoverStyled={application.theme.primaryQuarter} colorStyled={application.theme.primary}>
              <FormattedMessage
                id="navigation.searchResults"
                defaultMessage="No search results"
              />
            </Div>
        }
      } else {
        searchContainer = ''
      }
      
    }

    return(
      <Container className="d-flex outer-shadow searchContainer" heightStyled={`${application.settings.heightUserNav}`} containerBackground={`${application.mode.primary}`} containerRadius={`${application.settings.appRadius}`}>
        <Button className="prepend border-0 h-100pc" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} paddingStyled={`${application.settings.appPadding}`}>
          <i className="fal fa-search"></i>
        </Button>
        <div className="mt-5px searchBar">
          <Input
            type="text"
            placeholder={searchArticles}
            aria-label="Search for articles"
            value={this.state.search}
            onChange={this.updateSearch}
            className="p-5px border-0 inner-shadow h-20px ml-5px"
            backgroundStyled={`${application.theme.primaryQuarter}`}
            colorStyled={`${application.theme.primary}`}
            placeholderStyled={`${application.theme.primaryThree}`}
            radiusStyled={`${application.settings.appRadius}`}
          />
        </div>
        {listOpen &&
          <Div ref={this.setWrapperRef} className="d-flex flex-direction-column position-absolute resultsContainer overflow-hidden border-radius-8px outer-shadow" backgroundStyled={application.mode.primary}>
            {searchContainer}
          </Div>
        }
      </Container>
    )
  }
}

SearchWinds.propTypes = {
  application: PropTypes.object.isRequired,
  readApplicationTitles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { readApplicationTitles })(SearchWinds);