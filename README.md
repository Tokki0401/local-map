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
    * [/seed](#seed)
    * [/house/:id](#houseid)
    * [/map/:service](#mapservice)
1. [Related Projects](#related-projects)
    * [Proxy Projects](#proxy-projects)
    * [Non Proxy Projects](#non-proxy-projects)

## Usage

> This module is intended to be used in tandem with other modules for a wholistic experience. Please use with the listings carousel and image gallery related projects.

## Requirements
- Node >6.13.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```


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
  - TitleContainer
  - MainTitle
  - SubTitle
  - ContentContainer

### State
  - N/A
### Methods
  - N/A

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

### /seed
  - Expects a GET Request
  - Responds with the data used to seed the database
  - Useful for testing. Not meant for production.

### /house/:id
  - Expects a GET Request
  - Required Parameters: id
  - Repsonds with the House document with the corresponding house id

### /map/:service
  - Expects a GET Request
  - Required Parameters: service
    - ex: yelp
  - Body of the request:
    - lat (required) - latitude for the location to look around
    - lng (required) - longitude for the location to look around
    - categories (optional) - this will override the default categories of 'restaurants, shopping, arts, fitness'
  - Responds with JSON data from the specified service.
    - Ex: a request with yelp specified as the service will return with JSON data about the surrounding businesses.

## Related Projects
### Proxy Projects
  - https://github.com/Team-Sokka/proxy-local-map
  - https://github.com/Team-Sokka/Proxy-Listings-Carousel
  - https://github.com/Team-Sokka/Proxy-Image-Gallery
### Non-Proxy Projects
  - https://github.com/Team-Sokka/Image-Gallery
  - https://github.com/Team-Sokka/Listings-Carousel
