"use client";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './trailerButton.scss';

const TrailerModal = ({ trailerUrl, onClose }) => {
  useEffect(() => {
    // Prevent scrolling on the body when the modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'unset';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className='trailerModalOverlay'>
      <div className='trailerModal'>
        <div className='trailerModalContent'>
          <span className='close' onClick={onClose}>
            ×
          </span>
          <iframe
            id="trailerVideo"
            src={trailerUrl}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

const TrailerButton = (props) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchTrailer = async () => {
    try {
      // Assuming 'videoKey' is the YouTube video key
      if (props[0].key) {
        setTrailerUrl(`https://www.youtube.com/embed/${props[0].key}`);
        setShowModal(true);
      } else {
        alert('Trailer not available');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTrailerUrl('');
  };

  return (
    <div>
      <button className='watchTrailerBtn' onClick={fetchTrailer}>
        <i className="fa fa-play"></i> Watch Trailer
      </button>

      {showModal && <TrailerModal trailerUrl={trailerUrl} onClose={closeModal} />}
    </div>
  );
};

export default TrailerButton;
