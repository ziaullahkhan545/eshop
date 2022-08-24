import React, { useEffect } from "react";
import Home from "./pages/homepage/home";
import Navigation from "./components/navigation/navigation";
import Shop from "./pages/shop/shop";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/signin/singin";
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { createUserProfileDoc } from './components/firebase/firebase-utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions'
import CheckOut from "./pages/checkout/checkout";
import { currentUserSelector } from './redux/user/user-selectors'
import { createStructuredSelector } from "reselect";
import CollectionPage from "./pages/collectionpage/collectionpage";


function App(props) {

  const { setCurrentUser, currentUser } = props;
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:collectionID" element={<CollectionPage />} /> 
        <Route exact path="/signin" element ={ currentUser ? (<Navigate to='/' replace />) : (<Signin />) }/>
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

const mapStateToProps = createStructuredSelector ({
  currentUser: currentUserSelector
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
