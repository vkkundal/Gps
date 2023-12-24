// import logo from './logo.svg';
import { useState } from 'react'
// import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import db from './firebase';
import './App.css';

function App() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [userAddress, setUserAddress] = useState();

  console.log("latitude:", lat, lon);

  const geo = navigator.geolocation
  const watchID = geo.watchPosition(userCoords)
  function userCoords(position) {
    // console.log(position,"vinod");
    let userlat = position.coords.latitude
    let userlon = position.coords.longitude
    setLat(userlat);
    setLon(userlon);
  }
  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=ed693e08c1f7453e8083381cc90004b5&q=${lat}%2C+${lon}&pretty=1&no_annotations=1`
    const loc = await fetch(url)
    const data = await loc.json()
    console.log("user address -", data);
    setUserAddress(data.results[0].formatted)
  }
  // const handleGetUserAddress = () => {
  //   getUserAddress()
  // }

  // Add a new document in collection "cities"
  // const  Push = async () => {
  // await setDoc(doc(db, "state","cities"), {
  //   latitude: lat,
  //   longitude: lon,
  //   Address: userAddress,
  // await deleteDoc(doc(db, "cities", "LA"))
  // };
  // Add a new document in collection "cities"
  const Push = async () => {
    const cityRef = doc(db, "state", "cities");
    await setDoc(cityRef, { latitude: lat, longitude: lon, Address: userAddress }, { merge: true });
    console.log(cityRef, "push data");
  }
  const Play = async () => {
    getUserAddress();
    Push();
  }
  // stop gps
  const stopGPS = () => {
    geo.clearWatch(watchID)
  }
  return (
    <>
      <div className="App">
        <h1> Current location</h1>
        <h1> latitude -{lat}</h1>
        <h1> longitude -{lon}</h1>
        <h1> user Address -{userAddress}</h1>
        <button onClick={Play}>Play Game</button><br />
        <button onClick={stopGPS}>Stop Gps</button>
        {/* <button onClick={Push}>Stop</button> */}
      </div>     
    </>

  );
}

export default App;