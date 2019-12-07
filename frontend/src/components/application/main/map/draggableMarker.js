import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = require('../../../../actions/utils/config').mapboxKey;

class DraggableMarker extends Component {
  constructor(props){
    super(props)
    this.state = {
      style: '',
    }
  }

  vienti = [];

  componentDidMount() {
    if(this.props.application.mode.name==='Dark'){
      this.setState({
        style: 'mapbox://styles/mapbox/dark-v9'
      })
    } else {
      this.setState({
        style: 'mapbox://styles/mapbox/streets-v9'
      })
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.state.style,
      center: [-25.9473, 24.4268],
      zoom: 1,
      attributionControl: false
    }).addControl(new mapboxgl.AttributionControl({
        compact: true
    }));
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.props.application.theme.name!==prevProps.application.theme.name ) {
      
      let x;
      let y;

      x = this.map.getCenter();
      y = this.map.getZoom();

      if (this.props.application.mode.name === 'Dark') {
        this.setState({
          style: 'mapbox://styles/mapbox/dark-v9'
        })
        
        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/dark-v9',
          center: [x['lng'], x['lat']],
          zoom: y,
          attributionControl: false
        }).addControl(new mapboxgl.AttributionControl({
          compact: true
        }));

        

      } else {
        this.setState({
          style: 'mapbox://styles/mapbox/streets-v9'
        })
        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [x['lng'], x['lat']],
          zoom: y,
          attributionControl: false
        }).addControl(new mapboxgl.AttributionControl({
          compact: true
        }));

        

      }
    }

    if(this.props.application.mode.name!==prevProps.application.mode.name ) {
      
      let x;
      let y;

      x = this.map.getCenter();
      y = this.map.getZoom();

      if (this.props.application.mode.name === 'Dark') {
        this.setState({
          style: 'mapbox://styles/mapbox/dark-v9'
        })
        
        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/dark-v9',
          center: [x['lng'], x['lat']],
          zoom: y,
          attributionControl: false
        }).addControl(new mapboxgl.AttributionControl({
          compact: true
        }));

        

      } else {
        this.setState({
          style: 'mapbox://styles/mapbox/streets-v9'
        })
        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [x['lng'], x['lat']],
          zoom: y,
          attributionControl: false
        }).addControl(new mapboxgl.AttributionControl({
          compact: true
        }));

        
      }
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="mapgl-draggableMarker position-relative outer-shadow">
      </div>
    );
  }
}

DraggableMarker.propTypes = {
};

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(DraggableMarker);