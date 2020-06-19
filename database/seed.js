
//Seed Data from Trulia
const trulia = require('../database/truliaSeedData.js');
const mongoose = require('mongoose')
const House = require('./House.js');

//randomization functions (if necessary)
var beds = () => Math.floor(Math.random()* 5)+1;
var baths = () => Math.floor(Math.random()* 5)+1;
//var price = () => Math.floor(Math.random()* 3000000)+100000;
//var sqft = () => Math.floor(Math.random()* 2000) +1000;

var homes = trulia.truliaData.data.searchResultMap.homes;

var seeds = homes.map((home) => {
  var house = {};
  house.address = home.location.fullLocation;
  house.beds = home.bedrooms ? parseInt(home.bathrooms.formattedValue.substring(0, home.bathrooms.formattedValue.length-2)) : beds();
  house.baths = home.bedrooms ? parseInt(home.bedrooms.formattedValue.substring(0, home.bedrooms.formattedValue.length-2)) : baths();
  house.price = parseInt(home.price.formattedPrice.substring(1, home.price.formattedPrice.length).replace(/\,/g,''));
  house.sqft = parseInt(home.floorSpace.formattedDimension.substring(0, home.floorSpace.formattedDimension.length).replace(' sqft','').replace(/\,/g,''));
  house.location = {type: "Point", coordinates:[home.location.coordinates.longitude, home.location.coordinates.latitude] }
  return new House(house).save();
})
Promise.all(seeds).then(()=>{mongoose.disconnect(()=>console.log('Connection Closed'))})
