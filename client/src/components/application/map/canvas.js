import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import VientoItem from '../../vientos/vientoItem';
import { setVisibleVientos, setMapVientos, getLiveVientoByID } from '../../../actions/vientosActions';

mapboxgl.accessToken = require('../../../utils/config').mapboxKey;

class Mapbox extends Component {

  vienti = [];

  updateMapbox(viento) {
    this.props.setVisibleVientos(viento);
  }

  updateForOriginal(viento) {
    this.props.setMapVientos(viento);
  }

  componentDidMount() {

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-25.9473, 24.4268],
      zoom: 1
    });

  }

  componentDidUpdate(prevProps, prevState) {

    //Add onchange to reload map data
    if(this.props.vientos.vientos!==prevProps.vientos.vientos ) {
      const { vientos } = this.props.vientos;
      const { filters } = this.props.application;
      
      let x;
      let y;
      let vienti;
      let vienti2;

      x = this.map.getCenter();
      y = this.map.getZoom();

      this.mapContainer.innerHTML = '';

      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [x['lng'], x['lat']],
        zoom: y,
      });
    

      // var zoomcontrols = new mapboxgl.NavigationControl({
      //   showCompass: false
      // });
      // this.map.addControl(zoomcontrols, 'bottom-left');

      // let locatecontrol = new mapboxgl.GeolocateControl({
      //     positionOptions: {
      //         enableHighAccuracy: true
      //     },
      //     trackUserLocation: true
      // });
      // this.map.addControl(locatecontrol, 'bottom-right');

      // let attrcontrol = new mapboxgl.AttributionControl({
      //   compact: true
      // });
      // this.map.addControl(attrcontrol, 'top-right');
      
      vienti = [];
      x = this.map.getBounds().toArray();
      y = Object.values(filters);


      vientos.map(viento => {
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }
      });

      this.updateForOriginal(vienti);

      vienti2 = [];

      vientos.filter(viento => {
        if (y[0] != '' || null ) {
          let contentHTMLMatch = viento.title.toLowerCase().includes(y[0]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[1] != '' || null ) {
          let contentHTMLMatch = viento.type.includes(y[1]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[2] != '' || null ) {
          let contentHTMLMatch = viento.user.name.includes(y[2]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[3] != '' || null ) {
          let contentHTMLMatch = viento.topic.includes(y[3]);
          return contentHTMLMatch;
        }
        return viento;
      }).map(viento => {

        var popup = new mapboxgl.Popup()
        .setLngLat([viento.lat, viento.lon])
        .setHTML(`<a href='vientos/${viento._id}'>${viento.title}</a>`)
        .addTo(this.map);

        new mapboxgl.Marker({color:'#17a2b8'})
        .setLngLat([viento.lat, viento.lon])
        .setPopup(popup)
        .addTo(this.map);
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti2.push(viento);
        }
        
        });

        this.updateMapbox(vienti2);
    }
    
    //Check to see if we should flyto anywhere on map:
    if(this.props.application.centered!==prevProps.application.centered) {
      this.map.flyTo({
        center: [
          this.props.application.centered.lat,
          this.props.application.centered.lon
        ]
      });
      this.map.on('moveend', () => {
        const { vientos } = this.props.vientos;
        const { filters } = this.props.application;
        
        let x;
        let y;
        let vienti;
        let vienti2;
        
        vienti = [];
        vienti2 = [];
        x = this.map.getBounds().toArray();

        vientos.map(viento => {
          if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
            vienti.push(viento);
          }
        });
  
        this.updateForOriginal(vienti);

        this.props.vientos.vientos.filter(viento => {
          y = Object.values(filters);

          if (y[0] != '' || null ) {
            let contentHTMLMatch = viento.title.toLowerCase().includes(y[0]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[1] != '' || null ) {
            let contentHTMLMatch = viento.type.includes(y[1]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[2] != '' || null ) {
            let contentHTMLMatch = viento.user.name.includes(y[2]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[3] != '' || null ) {
            let contentHTMLMatch = viento.topic.includes(y[3]);
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
              
          if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
            vienti2.push(viento);
          }
          
          });

        this.updateMapbox(vienti2);
      });
    }

    //Add onchange to reload map data
    if(this.props.application.filters!==prevProps.application.filters ) {
      let vienti;
      let x;
      let y;
      let z;
      let xyz;

      const { vientos } = this.props.vientos;
      const { filters } = this.props.application;

      let chile = this.mapContainer.children[1].childElementCount;

      for ( xyz = 1; xyz < chile; xyz++) {
        this.mapContainer.children[1].children[1].remove();
      }
      
      vienti =[];

      y = Object.values(filters);

      vientos.filter(viento => {
        if (y[0] != '' || null ) {
          let contentHTMLMatch = viento.title.toLowerCase().includes(y[0]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[1] != '' || null ) {
          let contentHTMLMatch = viento.type.includes(y[1]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[2] != '' || null ) {
          let contentHTMLMatch = viento.user.name.includes(y[2]);
          return contentHTMLMatch;
        }
        return viento;
      }).filter(viento => {
        if (y[3] != '' || null ) {
          let contentHTMLMatch = viento.topic.includes(y[3]);
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
        

        x = this.map.getBounds().toArray();
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }
        
        });

        this.updateMapbox(vienti);

    }
  }

  visMoving = () => {
    this.map.on('moveend', () => {
      let vienti;
      let vienti2;
      let x;
      let y;

      // Make a popup from stateful markup:
      if(this.props.vientos != null) {
        const { vientos } = this.props.vientos;
        const { filters } = this.props.application;

        if (vientos.length > 0) {
        
          vienti = [];
          vienti2 = [];
          x = this.map.getBounds().toArray();
          y = Object.values(filters);

          vientos.map(viento => {
            if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
              vienti.push(viento);
            }
          });
    
          this.updateForOriginal(vienti);

          vientos.filter(viento => {
            if (y[0] != '' || null ) {
              let contentHTMLMatch = viento.title.toLowerCase().includes(y[0]);
              return contentHTMLMatch;
            }
            return viento;
          }).filter(viento => {
            if (y[1] != '' || null ) {
              let contentHTMLMatch = viento.type.includes(y[1]);
              return contentHTMLMatch;
            }
            return viento;
          }).filter(viento => {
            if (y[2] != '' || null ) {
              let contentHTMLMatch = viento.user.name.includes(y[2]);
              return contentHTMLMatch;
            }
            return viento;
          }).filter(viento => {
            if (y[3] != '' || null ) {
              let contentHTMLMatch = viento.topic.includes(y[3]);
              return contentHTMLMatch;
            }
            return viento;
          }).map(viento => {
            x = this.map.getBounds().toArray();
            
            if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
              vienti2.push(viento);
            }
          });
          this.updateMapbox(vienti2);
        } else {
          //Do Nothing
        }
      }
    });
    
  }


  render() {

    return (
      <div>
        <div ref={el => this.mapContainer = el} onTouchEnd={this.visMoving} onMouseUp={this.visMoving} onWheel={this.visMoving} className="mapgl absolute top right left bottom">
        </div>
      </div>
      
    );
  }
}

Mapbox.propTypes = {
  vientos: PropTypes.object.isRequired,
  setVisibleVientos: PropTypes.func.isRequired,
  setMapVientos: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  application: state.application,
  vientos: state.vientos
});

export default connect(mapStateToProps, {setVisibleVientos, setMapVientos})(Mapbox);