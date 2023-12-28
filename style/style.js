import { StyleSheet } from 'react-native';
import * as c from  './const.js';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.WHITE_COLOR,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bottomTab: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },  
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: c.PRIMARY_COLOR,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 0,
    marginTop: 0
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: c.TERTIARY_COLOR,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 0,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  inputView: {
    backgroundColor: c.TERTIARY_COLOR,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 16,
    textAlign: "center",
    color: "black"
  },
  buttonContainer: {
    height: 45,
    backgroundColor: c.PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderRadius: 30,
    padding: 5,
    color: c.PRIMARY_TEXT_COLOR,
  },
  buttonContainer_Y: {
    height: 45,
    backgroundColor: c.Y_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: "40  %",
    borderRadius: 30,
    padding: 5,
    color: c.PRIMARY_TEXT_COLOR,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.WHITE_COLOR,
    padding: 20,
  },  
  container_p: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.WHITE_COLOR,
    padding: 20,
  },
  container_p: {
    alignItems: 'center',
    backgroundColor: c.WHITE_COLOR,
    padding: 20,
    marginBottom: 0,
  },
  container_w: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: c.WHITE_COLOR,
    padding: 20,
    marginBottom: 0,
  },
  container_wb: {
    //flex: 1, // Set flex to evenly distribute child elements
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    backgroundColor: c.WHITE_COLOR,
    borderRadius: 32,
    marginBottom: '1%', // Add margin to create space between consecutive container_1 objects
    width: '100%',
    height: '15%'
  },
  container_b: {
    //flex: 1, // Set flex to evenly distribute child elements
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
    padding: 10,
    alignItems: 'left',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    backgroundColor: c.PRIMARY_COLOR,
    borderRadius: 20,
    marginBottom: '15%', // Add margin to create space between consecutive container_1 objects
    width: '100%',
  },
  container_Y: {
      margin: 10,
      flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
      borderRadius: 20,
      padding: 5,
      width: '50%',
      justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
      alignItems: 'center', // Align items in the center vertically
      backgroundColor: '#F6C324',
  
  },
  container_1: {
    //flex: 1, // Set flex to evenly distribute child elements
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    backgroundColor: c.PRIMARY_COLOR,
    borderRadius: 32,
    margin: '5%', // Add margin to create space between consecutive container_1 objects
  },
  container_2: {
    margin: 10,
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
    borderRadius: 20,
    padding: 5,
    width: '100%',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    alignItems: 'center', // Align items in the center vertically
    backgroundColor: '#8AE2E0',

  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginBottom: 20,
  },
  container_3: {
    //flex: 1, // Set flex to evenly distribute child elements
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    backgroundColor: c.PRIMARY_COLOR,
    borderRadius: 5,
    marginBottom: '15%', // Add margin to create space between consecutive container_1 objects
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tame_heading:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: c.PRIMARY_TEXT_COLOR,

  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
  },
   
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ADD8E6', // Light Blue
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: c.PRIMARY_TEXT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  footerButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchImage: {
    width: '100%',
    height: '60%',
    alignSelf: 'center',
   
  }
});

