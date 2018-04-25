# Google Maps BHF Display
This is a simple project which displays a selection of BHF medical locations across the UK.

## File usage
Below is short definition of what each of the files in the project does.

### `index.html` 
Provides a placeholder for the map to be displayed

### `script.js`
Fetches the map locations and sets the data to be displayed on the markers. The script makes use of two other libraries/APIs - tabletop.js and the Google Maps API. The Google Maps API is used to render the map and display the markers on it and the tabletop.js library fetches the data from a Google docs spreadsheet - giving the markers the data to be displayed.

### `style.css`
Sets custom styles for the map and markers.<br><br>

This is the URL for the Google docs spreadsheet:<br>
https://docs.google.com/spreadsheets/d/1Dx1mGp6WWZ0x5oPkwB8LJqUhxMo39k_pbgd6Dtp5Fo4/edit?usp=sharing