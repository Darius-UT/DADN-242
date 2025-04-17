import React from "react";
import Layout from "./_layout";
import { enableScreens } from 'react-native-screens';
import Toast from "react-native-toast-message";

enableScreens();

const App = () => {
  return <>
  <Layout />
  <Toast />
  </>;
};

export default App;