import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const List = ({ route }) => {
  const { locationData } = route.params;
  const [savedLocations, setSavedLocations] = useState([]);

  const addLocationData = (newLocationData) => {
    setSavedLocations((prevLocations) => [...prevLocations, newLocationData]);
  };

  useEffect(() => {
    if (locationData) {
      addLocationData(locationData);
    }
  }, [locationData]);

  const handleClearAll = () => {
    setSavedLocations([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Locations</Text>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{color:'tomato'}}>Clear All</Text>
                <Ionicons  style={{ marginLeft: 10 }} name="refresh" size={20} color="tomato" />
            </View>
        </TouchableOpacity>

      </View>
      {savedLocations.length === 0 ? (
        <Text>No locations saved yet.</Text>
      ) : (
        <FlatList
          data={savedLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.locationItem}>
              <Text>{(index + 1)}. Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
              <Text>Date and Time: {item.dateTime.toString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clearButton: {
    fontSize: 16,
    color: 'blue',
  },
  locationItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default List;