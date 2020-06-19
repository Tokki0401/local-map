import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from './components/Modal.jsx';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: 'hidden',
      shopAndEatMarkers: [],
      location: { lat: 21.260088, lng: -157.706806 }
    }
  }
  componentDidMount(){
    var centerPoint = this.state.location;
    window.map = new window.google.maps.Map(document.getElementById("map"), {
        center: centerPoint,
        zoom: 15
    });
    var centerMarker = new google.maps.Marker({position: centerPoint, map:map});
  }
  getShopAndEatMarkers(){
    axios.get(`/map/yelp`,{params:{
      lat: this.state.location.lat,
      lng: this.state.location.lng
    }
  }).then((data) => {
    console.log('Updating shop and Eat markers')

    var markers = data.data.businesses.map((business) => {
      return new google.maps.Marker({position: {lat: business.coordinates.latitude, lng: business.coordinates.longitude}, icon:'https://www.trulia.com/images/txl/icons/yelp/yelp_logo_small.png',  map: window.map})
    })
    this.setState({
      shopAndEatMarkers: markers
      })
      console.log('Markers: ', this.state.shopAndEatMarkers)
    })
  }
  basicMap(){
    this.clearAllMarkers();
    this.toggleModal();
  }
  toggleModal(){
    var modalVisibility = this.state.modalVisible === 'hidden' ? 'visible' : 'hidden';
    this.setState({
      modalVisible: modalVisibility,
    });
  }
  shopAndEatMap(){
    this.getShopAndEatMarkers();
    this.toggleModal();
  }
  streetView(){
    this.toggleModal();
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('map'),{position: this.state.location, pov: {heading: 54, pitch: 4}});
  }
  clearAllMarkers(){
    this.state.shopAndEatMarkers.forEach(marker => {
      console.log('removing')
      marker.setMap(null)
    })
  }
  render(){
    return (
      <React.Fragment>
       <Modal closeModal={this.toggleModal.bind(this)} modalVisibile={this.state.modalVisible} mapHeight={this.state.mapViewHeight} streetViewHeight={this.state.streetViewHeight}/>
      <div className="map-module-container">
        <div className="individual-map-container" onClick={this.basicMap.bind(this)}>
          <div className="individual-map-tile"></div>
          <h1>Basic Map</h1>
          <p>Details</p>
        </div>
        <div className="individual-map-container">
        <div className="individual-map-tile" onClick={this.shopAndEatMap.bind(this)}></div>
          <h1>Shop & Eat</h1>
          <p>Details</p>
        </div>
        <div className="individual-map-container">
        <div className="individual-map-tile" onClick={this.streetView.bind(this)}></div>
          <h1>Street View</h1>
          <p>Details</p>
        </div>
        <div className="individual-map-container">
        <div className="individual-map-tile"></div>
          <h1>Map 2</h1>
          <p>Details</p>
        </div>
      </div>

      </React.Fragment>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('mapModule'))