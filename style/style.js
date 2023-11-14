import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
    backgroundColor: "#8AE2E0",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 0
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#6AF2F0",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  inputView: {
    backgroundColor: "#6AF2F0",
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: "70%",
      borderRadius: 30,
      color: "#00000",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },  
  container_p: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  container_1: {

    //flex: 1, // Set flex to evenly distribute child elements
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    backgroundColor: '#8AE2E0',
    borderRadius: 32,
    marginBottom: '15%', // Add margin to create space between consecutive container_1 objects
  },
  container_2: {
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
    borderRadius: 20,
    padding: 5,
    width: '100%',
    justifyContent: 'space-evenly', // Use space-evenly to evenly space child elements
    alignItems: 'center', // Align items in the center vertically
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});

