import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 39.06825282844124,
    latitudeDelta: 20.915432264569404,
    longitude: 35.616687554866076,
    longitudeDelta: 17.0624565705657,
  });

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Need permission to get locations.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const currentDateTime = new Date();
    const localDateTimeString = currentDateTime.toLocaleString();

    setDateTime(localDateTimeString);

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.02, 
      longitudeDelta: 0.02, 
    });
  };

  const saveLocationData = () => {
    navigation.navigate('List', {
      locationData: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        dateTime: dateTime,
      },
    });
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={mapRegion} 
        >
          <Marker
            coordinate={{
              latitude: mapRegion.latitude,
              longitude: mapRegion.longitude,
            }}
          />
        </MapView>
      ) : (
        <Text>{errorMsg || 'Getting location data...'}</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={getLocationAsync}>
          <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>   
        <TouchableOpacity style={styles.button} onPress={saveLocationData} >
          <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  map: {
    margin: 10,
    borderWidth: 2,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'tomato',
  },
  buttonText: {
    color: 'white',
  },

});

export default Home;