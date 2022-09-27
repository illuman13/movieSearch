import React from 'react';
import { Detector } from 'react-detect-offline';

import ErrorOffline from '../errorOffline';
const Offline = (props) => {
  return (
    <>
      <Detector render={({ online }) => (online ? props.children : <ErrorOffline />)} />
    </>
  );
};

export default Offline;
