# Local Map
##### A replication of the map module on Trulia's individual House Page

> local map is intended to replicate Trulia's map module on their item page. local map currently has two distinct views:
> 1. Basic map with a marker
> 1. Map with markers of local businesses (restaurants, fitness centers, parks, etc.)
>
> Trulia Page module being replicated:
>
>![Image of Module Before Opening](https://lh3.googleusercontent.com/Ey-yFtdjy0cwi0IK-QbM4Iu-y6adEqKAOf2FmLd8fuHADgRLPQFZM3tJyoG8eHDO5KXUVj3pPmyWlKuhzED39nVZeJD1NEkz_FccqgwzG_7quDg2FcaVMvdZrN8q7UdeaOjkPJ6v)
>
> ![Image of Module opened on Shop and Eat view](https://lh4.googleusercontent.com/9C9iZSYzfH9CDFb1cpZMx8E75pG8DSx5ZrCPuiQ15z0KaDA4cyG1a0pZLjSJ23AMfCDtg_wOWP11xWthP1eMMmnqBIFOuZavPeL-bGQH4G-QUZCRh6mVs5azW-oMVw4rQIftGU_R)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [React Component Breakdown](#React-Component-Breakdown)
    * [App](#App)
    * [Modal](#Modal)
    * [ModalNav](#ModalNav)
    * [Details](#Details)
    * [DetialsItem](#DetailsItem)
    * [Map](#Map)
    * [StreetView](#StreetView)
1. [Server Endpoints](#Server-Endpoints)
    * [/](#root---)
    * [/proxy](#proxy---proxy)
    * [/seed](#seeding-data---seed)
    * [/house/:id](#finding-a-house---houseid)
    * [/map/:service](#getting-markers-for-the-map---mapservice)
1. [Map Setup Explained](#map-setup-explained)
1. [Related Projects](#related-projects)
    * [Proxy Projects](#proxy-projects)
    * [Non Proxy Projects](#non-proxy-projects)

## Usage

> This module is intended to be used in tandem with other modules for a wholistic experience. Please use with the listings carousel and image gallery related projects.

## Requirements
- Node >6.13.0

## Development

### Module Setup
Create a .env file in the root directory, with the following properties
1. HOST_URL= **{INSERT YOUR HOST URL}**
1. PORT= **{INSERT DESIRED PORT}**
1. YELP_API_KEY= **{INSERT YOUR YELP API KEY}**
1. MONGO_DB_URI= **{INSERT YOUR MONGODB URI}**

### Installing Dependencies

From within the root directory:

```sh
npm install
```
### Starting the server

From within the root directory:

Run the nodemon server:
```sh
npm run dev
```

Run webpack:
```sh
npm run build
```

### Additional Setup for a Proxy Server
Do the following following inside the proxy's html file:
1. Add the following to the head:
>  <!-- Icons for local map -->
>  <script src="https://kit.fontawesome.com/cb5488eec8.js" crossorigin="anonymous"></script>
>  <!-- Trulia Font -->
>  <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans:400,500,700">

1. Add the following to the body:
>  <!-- div for the module to attach the component to -->
> <div id="mapModule"></div>
>  <!-- script for Google Maps -->
> <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE"> </script>

1. Send GET request to the /proxy endpoint with id as a paramater, and a number for the corresponding house id.
> Example:
> <script src="http://127.0.0.1:8002/proxy?id=144"></script>
> **Note**: The src for this script tag will need to be dynamically generated.


# React Component Breakdown

## App
### Child React Components
  - Modal
### Styled Components
  - MapModuleContainer - Parent Container of all IndividualMapContainers
  - InvidividualMapContainer - container
  - MapTile - img
  - MapTitle - text
  - MapSubtitle - Text’

### State
  - modalVisible - boolean on whether the modal should be hidden. t
  - currentHouse - object to hold information about the current house
  - currentPlaces - Array of all the ‘places’ being displayed on the map from external API’s
  - shopAndEatMarkers - holds all markers generated by createShopAndEatMarkers
  - Location - object to hold latitude and longitude coordinates for the current house
  - CurrentMapView - an object of boolean key/value pairs corresponding to their map view.
    - basic
    - streetView
    - schools
    - crime
    - commute
    - shopAndEat

### Methods
  - componentDidMount()
    - Invoked when component mounts
    - Invokes pullParams() and assigns to a ‘params’ var
    - Sends a GET request to /house/${params.id} to retrieve information about the house
      - Primary purpose is to find the coordinates to use as a center point for the map

  - pullParams()
    - Parsing function to parse parameters passed into the url

  - initializeMap()
    - Creates a new Google Map with a center point based on the current state of location

  - getShopAndEatMarkers()
    - Sends a GET request to Yelp based on the current location
      - Then invokes createShopAndEatMarkers
      - And sets the state of currentPlaces

  - createShopAndEatMarkers(array)
    - Takes an array of businesses generated by the Yelp API and for each business creates: 1). A marker, 2). An infoWindow 3). An event listener for mousing over the infowindow, 4). An event listener for mousing out of the infoWindow.
    - Icons are determined based on the first recognized category
    - Also sets the state for shopAndEatMarkers

  - basicMap()
    - Sets state of the ‘basic’ key in currentMapView, and sets all other keys to false.
    - Invokes clearAllMarkers
    - If the modal is not hidden - toggles the modal (closes it)


  - toggleModal()
    - Changes the state of modalVisible to hide or show the modal.
    - Checks the state of modalVisible
    - Sets the state of modalVisible to its opposite

  - showState()
    - Helper function useful for debugging.
    - Displays App’s current state.

  - shopAndEatMap()
    - Sets state of the ‘shopAndEat’ key in currentMapView, and sets all other keys to false.
    - Invokes getShopAndEatMarkers()
    - Toggles modal if modal is hidden

  - streetViewMap()
    - Skeleton function (i.e. needs further development)
    - Sets state of the ‘streetView’ key in currentMapView, and sets all other keys to false.
    - Invokes clearAllMarkers
    - Toggles modal if modal is hidden

  - schoolsMap()
    - Skeleton function (i.e. needs further development)
    - Sets state of the ‘schools’ key in currentMapView, and sets all other keys to false.
    - Invokes clearAllMarkers
    - Toggles modal if modal is hidden

  - crimeMap()
    - Skeleton function (i.e. needs further development)
    - Sets state of the ‘crime’ key in currentMapView, and sets all other keys to false.
    - Invokes clearAllMarkers
    - Toggles modal if modal is hidden

  - commuteMap()
    - Skeleton function (i.e. needs further development)
    - Sets state of the ‘commute’ key in currentMapView, and sets all other keys to false.
    - Invokes clearAllMarkers
    - Toggles modal if modal is hidden

  - clearAllMarkers()
    - Iterates through each marker in the state variable shopAndEatMarkers, and for each marker invokes it’s setMap method, passing in ‘null’ as an argument
      - This removes the marker from the map


## Modal Component

### Child React Components
  - ModalNav
  - Map
  - StreetView

### Styled Components
 - FlexContainer
  - Creates a new flexbox for the ModalContainer to reside in
  - Allows for more flexibility, including:
    - Centering the Modal and it’s content
    - Creating a blurred backdrop for the modal when it is open
  - ModalContainer
    - Positions the modal on top of everything else, and controls visibility of the modal
  - MapContainer
    - Creates a flex box around the map to aid in styling

### State
  - N/A - Stateless Component

### Methods
  - N/A

## ModalNav Component

### Child React Components
  - None
### Styled Components
  - NavWrapper
  - LeftNavContainer
  - RightNavContainer
  - Button
  - RightButton
  - CloseButton

### State
  - N/A - Stateless Component

### Methods
  - N/A

## Details Component

### Child React Components
  - DetailsItem

### Styled Components
  - FlexContainer
  - DetailContainer
  - TitleContainer
  - MainTitle
  - SubTitle
  - ContentContainer
  - FormContainer
  - FormTitle
  - Form
  - SimpleInput
  - MessageText
  - Submit
  - CheckboxContainer
  - CheckBox
  - Legal Disclaimer

### State
  - name - Value of the name field in the form
  - phone - Value of the phone field in the form
  - email - Value of the email field in the form
  - message - Value of the message field in the form
  - defaultMessageRendered - Boolean that specifies if the message has been updated to include the current house address
  - talkAboutFinancing - Boolean value of the checkbox field in the form
### Methods
  - componentDidUpdate() - On initial render, this.props.currentHouse.address is undefined. When currentHouse is initialized to an object, this funciton runs. Inside, there is a conditional that checks the state of defaultMessageRendered. If it is false, the state of message is updated with the currentHouse address, and defaultMessageRendered is set to true to avoid an infinite loop.
  - updateName(event) - Updates the state of name
  - updatePhone(event) - Updates the state of phone
  - updateEmail(event) - Updates the state of email
  - updateMessage(event) - Updates the state of message
  - updateTalkAboutFinancing() - Toggles talkAboutFinancing
  - logThis(type, content) - Helper function for debugging
    - type is a string to be logged before content
    - content is the state, prop, etc. to be checked
    - By default, there are two console logs to be used in here to display the props and state.
  - sendMessage(e) - Unconfigured function to sendMessage
    - Configure this however you would like the message to be sent.

## DetailsItem Component

### Child React Components
  - N/A
### Styled Components
  - ItemContainer
  - LeftContainer
  - RightContainer
  - ItemTitle
  - ItemSubtitle
  - ItemContent
  - BusinessImage
  - ReviewsAndRating

### State
  - N/A - Stateless Component
### Methods


## Map Component

### Child React Components
  - N/A
### Styled Components
  - N/A
### State
  - N/A - Stateless Component
### Methods
  - N/A


## StreetView Component
**Does not currently display in application**

### Child React Components
  - N/A
### Styled Components
  - N/A
### State
  - N/A
### Methods
  - N/A

# Server Endpoints

### Root - /
  - Expects a GET Request
  - Responds with the index.html file
  - Sending a request without parameters will result in content without any housing data, and therefore no map. To retrieve the module with housing information included, include id as a parameter in the request.

### Proxy - /proxy
  - Expects a GET Request
  - Responds with the webpack bundle
  - Sending a request without parameters will result in content without any housing data, and therefore no map. To retrieve the module with housing information included, include id as a parameter in the request.

### Seeding Data - /seed
  - Expects a GET Request
  - Responds with the data used to seed the database
  - Useful for testing. Not meant for production.

### Finding a house - /house/:id
  - Expects a GET Request
  - Required Parameters: id
  - Repsonds with the House document with the corresponding house id

### Getting markers for the map - /map/:service
  - Expects a GET Request
  - Required Parameters: service
    - ex: yelp
  - Body of the request:
    - lat (required) - latitude for the location to look around
    - lng (required) - longitude for the location to look around
    - categories (optional) - this will override the default categories of 'restaurants, shopping, arts, fitness'
  - Responds with JSON data from the specified service.
    - Ex: a request with yelp specified as the service will return with JSON data about the surrounding businesses.

# Map Setup Explained

By default Google Maps expects you to be working with html, css, and js.
The API is loaded with a simple script tag. The suggested implementation is to include a callback function in the request. This callback function initializes the map onto a specified element (typically a div with an id of 'map' or something similar).

However, we are using components that transpile to js and render html, rather than loading all of our html at once. This means, that the 'map' div cannot be found, and the code will error out.

The solution to this is to not use a callback function, and instead instatiate a new map object inside of the App component. This map is add as a property on the window object so that it can be accessed and manipulated in any component.

A package such as [Google Map React](https://www.npmjs.com/package/google-map-react) could be used as well, but we appreciated the flexibility of working without a package.

Visit Google's site for more details on [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)

# Related Projects
### Proxy Projects
  - https://github.com/Team-Sokka/proxy-local-map
  - https://github.com/Team-Sokka/Proxy-Listings-Carousel
  - https://github.com/Team-Sokka/Proxy-Image-Gallery
### Non-Proxy Projects
  - https://github.com/Team-Sokka/Image-Gallery
  - https://github.com/Team-Sokka/Listings-Carousel
