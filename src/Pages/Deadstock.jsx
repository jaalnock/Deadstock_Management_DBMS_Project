import React from 'react';
import Check from './Check';
import Video from '../assets/video2.mp4'; // Import the background video

const backgroundStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: -1,
  objectFit: 'cover',
};

export default function Deadstock() {
  return (
    <div style={{ position: 'relative' }}>
      <video autoPlay loop muted style={backgroundStyle}>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Check />
    </div>
  );
}
