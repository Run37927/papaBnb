import React from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';


function MapSection({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = React.useState({});

  //transform the searchResults object into getCenter() criteria
  // { latitude: 52.516272, longitude: 13.377722 }
  const coordinates = searchResults.map(result => ({
    // return an object every time it loops through
    longitude: result.long,
    latitude: result.lat,
  }))


  // the latitude and longitude of the center of all of those bnb locations
  const center = getCenter(coordinates);

  const [viewState, setViewState] = React.useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })


  return (
    <Map
      mapStyle="mapbox://styles/hhruhy/clcfb6gnv008t14qq745yyax6"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
    >

      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
              role='img'
            >📍</p>
          </Marker>

          {/* the popup that should show if we click on a Marker */}
          {selectedLocation.long === result.long ?
            (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
              >
                {result.title}
              </Popup>
            ) :
            (false)}
        </div>
      ))}
    </Map>
  )
}

export default MapSection