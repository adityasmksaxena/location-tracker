import React from 'react';

const Marker = ({ onClick, $hover }) => (
  <button
    className="marker"
    style={
      $hover
        ? {
            backgroundColor: 'green',
          }
        : {}
    }
    onClick={onClick}
  />
);

export default Marker;
