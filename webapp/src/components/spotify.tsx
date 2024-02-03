import React, { useEffect, useState } from 'react';

interface SpotifyTokenResponse {
  token: string;
}

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  // Add more fields as needed
}

const SpotifyComponent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<SpotifyUserProfile | null>(null);

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      try {
        const responseToken = await fetch('http://localhost:3001/getSpotifyToken');

        if (responseToken.ok) {
          const dataToken: SpotifyTokenResponse = await responseToken.json();
          console.log('Spotify token:', dataToken.token);
          setToken(dataToken.token);
        console.log(dataToken.token)
          // Fetch user profile using the obtained token
          const responseProfile = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${dataToken.token}`,
            },
          });

          if (responseProfile.ok) {
            const dataProfile: SpotifyUserProfile = await responseProfile.json();
            console.log('User Profile:', dataProfile);
            setUserProfile(dataProfile);
          } else {
            console.error('Error getting user profile:', responseProfile.statusText);
          }
        } else {
          console.error('Error getting Spotify token:', responseToken.statusText);
        }
      } catch (error) {
        console.error('Error getting Spotify token or user profile:', error);
      }
    };

    fetchSpotifyToken();
  }, []); // The empty dependency array ensures that useEffect runs only once on mount

  return (
    <div>
      {token && userProfile ? (
        <div>
          <p>Token: {token}</p>
          <p>User Profile:</p>
          <p>Display name: {userProfile.display_name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyComponent;
