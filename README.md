# Save Location App with React Native

## Introduction

This application aims to get user's current location and save it if desired. It contains a sub-tab and two pages named Home and List. Home page features a location map and two buttons to update and save location data. List page displays saved location data and a clear data button. 

## Used Libraries and Frameworks

- React Navigation
- Expo Location
- React Native Maps
- Ionicons

## Methods / Experiments

Firstly, App.js presents two sub-tabs named Home and List, which redirect the user to their respective pages. Sub-tabs are created with React Native/Bottom Tabs. 
Home.js displays a map initially limited to the Turkey region without any markers. Map is created using React Native Maps. Location data is received via Expo Location. If user clicks the update button; Expo Location generates current location data and React Native Maps use that data to create a marker on the map. If user clicks the save button; saveLocationData() navigates received location data to List.js file. 
List.js displays saved location data along with the date and time they were saved. There is a Clear All button to remove previous location datas. If there is no data to show, a message says "No locations saved yet." in List page.

## Bugs and Fixes

Home.js is the default page. However, if the user clicks on the List page before saving any data, the application crashes due to 'locationData' being undefined. locationData is defined using 'route.params' so there is no data to pass if the Save button is not clicked. This condition causes List.js to crash upon the first open. After the initial data transfer, there are no crashes even if the data is cleared later. This bug is a significant issue and needs to be fixed. I am currently working on this bug but have decided to leave it as it is because I don't want to rush a simple solution. I want to explore a new approach. Please excuse me; I am aware of the problem.

## Further Improvements

Saved locations are only stored while the application is running. If the application is closed and then reopened, the stored data is lost. Among the libraries for data storage, Async Storage seems to be the best choice for this application. To provide a better service to the user, data storage implementations can be considered.
I haven't felt the need to set the application icon and splash screen since the app is running through Expo Go. If there is a desire to turn it into a standalone application for Android and iOS in the future, the default images can be changed.

## References

- https://reactnavigation.org/docs/tab-based-navigation
- https://reactnavigation.org/docs/params/
- https://reactnative.dev/docs/environment-setup
- https://ionic.io/ionicons
- https://docs.expo.dev/versions/latest/sdk/location/
- https://docs.expo.dev/versions/latest/sdk/map-view/
