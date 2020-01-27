import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import { setVisibleVientos, setMapVientos } from '../../../../actions/vientosActions';

mapboxgl.accessToken = require('../../../../actions/utils/config').mapboxKey;

class Mapbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      style: '',
    }
  }

  vienti = [];

  updateMapbox(viento) {
    this.props.setVisibleVientos(viento);
  }

  updateForOriginal(viento) {
    this.props.setMapVientos(viento);
  }

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

      const { vientos } = this.props.vientos;
      const { application } = this.props;
      const { filters } = this.props.application;
      
      let x;
      let y;
      let vienti;
      let vienti2;

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

      vienti = [];
      x = this.map.getBounds().toArray();
      y = Object.values(filters);


      vientos.map(viento => {
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }
        return null;
      });

      this.updateForOriginal(vienti);

      vienti2 = [];

      vientos.filter(viento => {
        if (y !== "" || null) {
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        } else {
          return viento;
        }
      }).map(viento => {

        var popup = new mapboxgl.Popup()
        .setLngLat([viento.lat, viento.lon])
        .setHTML(`<LinkContainer class="clickable" colorStyled="${application.theme.primary}" href='vientos/${viento._id}'>${viento.title}</LinkContainer>`)
        .addTo(this.map);

        new mapboxgl.Marker({color:`${application.theme.primary}`})
        .setLngLat([viento.lat, viento.lon])
        .setPopup(popup)
        .addTo(this.map);
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti2.push(viento);
        }
        
        return null;
        });

        this.updateMapbox(vienti2);
    }

    if(this.props.application.mode.name!==prevProps.application.mode.name ) {

      const { vientos } = this.props.vientos;
      const { application } = this.props;
      const { filters } = this.props.application;
      
      let x;
      let y;
      let vienti;
      let vienti2;

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

      vienti = [];
      x = this.map.getBounds().toArray();
      y = Object.values(filters);


      vientos.map(viento => {
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }
        return null;
      });

      this.updateForOriginal(vienti);
      

      vienti2 = [];

      vientos.filter(viento => {
        if (y !== "" || null) {
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        } else {
          return viento;
        }
      }).map(viento => {

        var popup = new mapboxgl.Popup()
        .setLngLat([viento.lat, viento.lon])
        .setHTML(`<LinkContainer class="clickable" colorStyled="${application.theme.primary}" href='vientos/${viento._id}'>${viento.title}</LinkContainer>`)
        .addTo(this.map);

        new mapboxgl.Marker({color:`${application.theme.primary}`})
        .setLngLat([viento.lat, viento.lon])
        .setPopup(popup)
        .addTo(this.map);
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti2.push(viento);
        }
        
        return null;
        });

        this.updateMapbox(vienti2);

    }

    //Add onchange to reload map data
    if(this.props.vientos.vientos!==prevProps.vientos.vientos ) {
      const { vientos } = this.props.vientos;
      const { filters } = this.props.application;
      const { application } = this.props;
      
      let x;
      let y;
      let vienti;
      let vienti2;

      x = this.map.getCenter();
      y = this.map.getZoom();

      this.mapContainer.innerHTML = '';

      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: this.state.style,
        center: [x['lng'], x['lat']],
        zoom: y,
        attributionControl: false
      }).addControl(new mapboxgl.AttributionControl({
        compact: true
    }));
      
      vienti = [];
      x = this.map.getBounds().toArray();
      y = Object.values(filters);


      vientos.map(viento => {
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }

        return null;
      });

      this.updateForOriginal(vienti);

      vienti2 = [];

      vientos.filter(viento => {
        if (y !== "" || null) {
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        } else {
          return viento;
        }
      }).map(viento => {

        var popup = new mapboxgl.Popup()
        .setLngLat([viento.lat, viento.lon])
        .setHTML(`<LinkContainer class="clickable" colorStyled="${application.theme.primary}" href='vientos/${viento._id}'>${viento.title}</LinkContainer>`)
        .addTo(this.map);

        new mapboxgl.Marker({color:`${application.theme.primary}`})
        .setLngLat([viento.lat, viento.lon])
        .setPopup(popup)
        .addTo(this.map);
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti2.push(viento);
        }
        
        return null;
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
        const { application } = this.props;
        
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

          return null;
        });
  
        this.updateForOriginal(vienti);

        y = Object.values(filters);

        this.props.vientos.vientos.filter(viento => {
          if (y !== "" || null) {
            if (y[0] == "Title") {
              let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
              return contentHTMLMatch;
            } else if (y[0] == "Author") {
              let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
              return contentHTMLMatch;
            }
            else {
              return viento;
            }
          } else {
            return viento;
          }
        }).map(viento => {

          var popup = new mapboxgl.Popup()
          .setLngLat([viento.lat, viento.lon])
          .setHTML(`<LinkContainer class="clickable" colorStyled="${application.theme.primary}" href='vientos/${viento._id}'>${viento.title}</LinkContainer>`)
          .addTo(this.map);

          new mapboxgl.Marker({color:`${application.theme.primary}`})
          .setLngLat([viento.lat, viento.lon])
          .setPopup(popup)
          .addTo(this.map);
              
          if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
            vienti2.push(viento);
          }
          
          return null;
          });

        this.updateMapbox(vienti2);
      });
    }

    //Add onchange to reload map data
    if(this.props.application.filters!==prevProps.application.filters ) {
      let vienti;
      let x;
      let y;
      let xyz;

      const { vientos } = this.props.vientos;
      const { filters } = this.props.application;
      const { application } = this.props;

      let chile = this.mapContainer.children[1].childElementCount;

      for ( xyz = 1; xyz < chile; xyz++) {
        this.mapContainer.children[1].children[1].remove();
      }
      
      vienti =[];

      y = Object.values(filters);

      vientos.filter(viento => {
        if (y !== "" || null) {
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        } else {
          return viento;
        }
      }).map(viento => {

        var popup = new mapboxgl.Popup()
        .setLngLat([viento.lat, viento.lon])
        .setHTML(`<LinkContainer class="clickable" colorStyled="${application.theme.primary}" href='vientos/${viento._id}'>${viento.title}</LinkContainer>`)
        .addTo(this.map);

        new mapboxgl.Marker({color:`${application.theme.primary}`})
        .setLngLat([viento.lat, viento.lon])
        .setPopup(popup)
        .addTo(this.map);
        

        x = this.map.getBounds().toArray();
            
        if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
          vienti.push(viento);
        }
        
        return null;
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
      if(this.props.vientos !== null) {
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

            return null;
          });
    
          this.updateForOriginal(vienti);

          vientos.filter(viento => {
            if (y !== "" || null) {
              if (y[0] == "Title") {
                let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
                return contentHTMLMatch;
              } else if (y[0] == "Author") {
                let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
                return contentHTMLMatch;
              }
              else {
                return viento;
              }
            } else {
              return viento;
            }
          }).map(viento => {
            x = this.map.getBounds().toArray();
            
            if ((x[0][0] <= viento.lat) && (viento.lat <= x[1][0]) && (x[0][1] <= viento.lon) && (viento.lon <= x[1][1])) {
              vienti2.push(viento);
            }

            return null;
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
      <div ref={el => this.mapContainer = el} onTouchEnd={this.visMoving} onMouseUp={this.visMoving} onWheel={this.visMoving} className="vientos position-relative z-995 border-bottom-1 outer-shadow-primary">
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