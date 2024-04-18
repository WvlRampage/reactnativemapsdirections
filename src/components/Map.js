import React, { useState,useRef, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'
import Geolocation from '@react-native-community/geolocation';


const Map = () => {
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [nameA, setNameA] = useState(null)
  const [nameB, setNameB] = useState(null)
  const mapViewRef = useRef(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
  
  }, [])
  

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <GooglePlacesAutocomplete
        placeholder="Dirección A"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log("details", details)
          setNameA(details.formatted_address)
          setPointA({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'es',
        }}
        styles={{
          container: styles.containerMap,
          textInputContainer: styles.textInputContainer,
          textInput:styles.textInput,
          listView: styles.listView,
          row: styles.row,
          separator: styles.separator
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Dirección B"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setNameB(details.formatted_address)
          setPointB({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'es',
        }}
        styles={{
          container: styles.containerMap,
          textInputContainer: styles.textInputContainer,
          textInput:styles.textInput,
          listView: styles.listView,
          row: styles.row,
          separator: styles.separator
        }}
      />
      
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: 6.244203, // Medellín, Colombia
          longitude: -75.5812119,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pointA && <Marker coordinate={pointA} title={nameA} />}
        {pointB && <Marker coordinate={pointB} title={nameB} />}
        {pointA && pointB && (
          <MapViewDirections
            origin={pointA}
            destination={pointB}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="blue"
            onReady={(result) => {
              mapViewRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        )}
      </MapView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  containerMap: {            
    top: Platform.select({ ios: 40, android: 0 }), // Ajusta la distancia desde la parte superior
    width: '100%', // Asegúrate de que el contenedor ocupe todo el ancho
  },
  textInputContainer: {
    width: '100%', // Asegúrate de que el input ocupe todo el ancho
  },
  textInput: {
    height: 44,
    fontSize: 16,
  },
  listView: {
    zIndex: 10, // Asegúrate de que la lista de sugerencias esté por encima de los demás elementos
    position: 'absolute', // Posiciona la lista de sugerencias en la parte superior de otros elementos
    top: 50, // Ajusta la distancia desde la parte superior del contenedor
    backgroundColor: 'white', // Fondo blanco para la lista de sugerencias
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal:10
  },
  row: {
    padding: 0,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
  },
});

export default Map;