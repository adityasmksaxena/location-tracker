import React from 'react';

const Marker = ({ curLocationMarker, onClick, $hover }) => (
  <button
    className="marker"
    style={
      $hover || curLocationMarker
        ? {
            backgroundColor: 'green',
          }
        : {}
    }
    onClick={onClick}
  />
);

export default Marker;
