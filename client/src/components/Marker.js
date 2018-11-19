import React from 'react';
import LocationOn from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';

const Marker = ({ curLocationMarker, onClick, $hover, text }) =>
  curLocationMarker ? (
    <Tooltip title={text && text !== ' ' ? text.toUpperCase() : ''} placement="top">
      <LocationOn
        className="marker"
        onClick={onClick}
        style={$hover ? { cursor: 'pointer' } : {}}
      />
    </Tooltip>
  ) : (
    <button className="marker-old" />
  );

export default Marker;
