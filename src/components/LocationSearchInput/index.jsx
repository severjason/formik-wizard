import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.setValue = this.props.form.setFieldValue;
    this.state = { address: this.props.field.value };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
	    .then(results => {
	      this.setValue('location', results[0].formatted_address);
		    this.setState({ address: results[0].formatted_address });
	      return getLatLng(results[0])
	    })
	    .then(latLng => {
        this.setValue('address', {lat: latLng.lat, lng: latLng.lng, location: this.state.address});
      })
	    .catch(error => {/*console.error('Error', error)*/});
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{
          componentRestrictions:{ country: ['usa']},
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-wrapper">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control project-input bg-white',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;