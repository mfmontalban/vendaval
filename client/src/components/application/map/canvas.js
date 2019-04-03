import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import VientoItem from '../../vientos/vientoItem';

mapboxgl.accessToken = 'pk.eyJ1IjoibWZtb25jYXlvIiwiYSI6ImNqN2NxajNhZjAxMzQyd28yOGR1cmxnN2gifQ.jMwpSYwVgU7Jha1bUYYK6g';

class Mapbox extends Component {

  componentDidMount() {
    let vienta;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-87.6298, 41.8781],
      zoom: 12
    });

    this.map.on('load', () => {

      // Make a popup from stateful markup:
      if(this.props.vientos != null) {
        const { vientos, loading } = this.props.vientos;
        const { filters } = this.props.application;

        if (vientos.length > 0) {
          vientos.filter(viento => {
            if (filters.text.keyword != null) {
              const contentHTMLMatch = viento.title.toLowerCase().includes(filters.text.keyword);
              return contentHTMLMatch;
            }
            return viento;
          }).map(viento => {
  
            var popup = new mapboxgl.Popup()
            .setLngLat([viento.lat, viento.lon])
            .setHTML(`<a href='vientos/${viento._id}'>${viento.title}</a>`)
            .addTo(this.map);

            var marker = new mapboxgl.Marker()
            .setLngLat([viento.lat, viento.lon])
            .setPopup(popup)
            .addTo(this.map);
            
            vienta = (
              <VientoItem key={viento._id} viento={viento} />
            );
          });
        } else {
          //Do Nothing
        }

      }

    });
  }

  componentDidUpdate(prevProps, prevState) {
    //Add onchange to reload map data
    if(this.props.vientos.vientos!==prevProps.vientos.vientos) {
      let vienta;
      let timer;

      const { vientos } = this.props.vientos;
      const { filters } = this.props.application;

      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-87.6298, 41.8781],
        zoom: 12
      });

      vientos.map(viento => {
        var x = mapboxgl.marker([viento.lat, viento.lon]).addTo(this.map);
        this.map.removeLayer(x);
        timer = 'done';
      });

      if (timer = 'done') {
        vientos.filter(viento => {
          let case1 = viento.title.toLowerCase().includes(filters.text);
          return case1;
        }).map(viento => {

          var popup = new mapboxgl.Popup()
          .setLngLat([viento.lat, viento.lon])
          .setHTML(`<a href='vientos/${viento._id}'>${viento.title}</a>`)
          .addTo(this.map);

          var marker = new mapboxgl.Marker()
          .setLngLat([viento.lat, viento.lon])
          .setPopup(popup)
          .addTo(this.map);
          
          vienta = (
            <VientoItem key={viento._id} viento={viento} />
          );
        });
      }
    }
  }

  render() {
    let vienta;
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapgl absolute top right left bottom">
        </div>
        <div>
          {vienta}
        </div>
      </div>
      
    );
  }
}

Mapbox.propTypes = {
  vientos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  vientos: state.vientos
});

export default connect(mapStateToProps, {})(Mapbox);