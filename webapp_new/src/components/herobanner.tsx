// HeroBanner.tsx

import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled, Theme } from '@mui/system';
import '../fonts.css';
import '../styles.css'

const HeroBannerContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  backgroundImage: `url('/images/background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 400, // Adjust the height as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  transition: 'opacity 1s ease-in-out', // Add transition for opacity
  opacity: 0, // Start with opacity 0
  '&.visible': {
    opacity: 1, // Change opacity to 1 when the 'visible' class is applied
  },
}));

const HeroBannerInnerBackground = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100%', // Adjust the height as needed
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  opacity: 0.5,
  position: 'relative', // Ensure that it creates a stacking context
  zIndex: 1,
  transition: 'opacity 1s ease-in-out', // Add transition for opacity
  '&.visible': {
    opacity: 0.5, // Change opacity to 1 when the 'visible' class is applied
  },
}));

const HeaderText = styled(Typography)({
  fontFamily: 'Unicod Sans-Condensed',
  color: '#00d2b5',
  fontSize: '5rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  opacity: 0, // Start with opacity 0
  transition: 'opacity 1s ease-in-out', // Add transition for opacity
  '&.visible': {
    opacity: 1, // Change opacity to 1 when the 'visible' class is applied
  },
  padding: '10px',
  background: '#17171745'
});

const Paragraph = styled(Typography)({
    fontFamily: 'Unicod Sans-Condensed-Ultralight',
    color: '#90caf9',
    fontSize: '2rem',
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    opacity: 0, // Start with opacity 0
    transition: 'opacity 1s ease-in-out', // Add transition for opacity
    '&.visible': {
      opacity: 1, // Change opacity to 1 when the 'visible' class is applied
    },
  });

const HeroBanner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Delay the visibility to trigger the fade-in effect
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <HeroBannerContainer className={isVisible ? 'visible' : ''}>
        <HeaderText variant="h3" className={isVisible ? 'visible' : ''}>
          Vantaa [FM]
          <div className="playing">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
        </HeaderText>
        <Paragraph variant="h3" className={isVisible ? 'visible' : ''}>
            Analytics data for Spotify
        </Paragraph>
      <HeroBannerInnerBackground className={isVisible ? 'visible' : ''}>
      </HeroBannerInnerBackground>
    </HeroBannerContainer>
  );
};

export default HeroBanner;
