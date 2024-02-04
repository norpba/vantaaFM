// AppContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react'

// Define the shape of your context
interface AppContextProps {
  profile: any | null;
  latestTracks: any | null;
  setProfile: (profile: any | null) => void;
  setLatestTracks: (latestTracks: any | null) => void;
}

// Create the context with an initial value (undefined in this case)
const AppContext = createContext<AppContextProps | undefined>(undefined)

// Create a provider component that wraps your app
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// Define your state variables
	const [profile, setProfile] = useState<any | null>(null)
	const [latestTracks, setLatestTracks] = useState<any | null>(null)

	// Provide the state and setter functions through the context
	const contextValue: AppContextProps = {
		profile,
		latestTracks,
		setProfile,
		setLatestTracks,
	}

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Create a custom hook for consuming the context
export const useAppContext = () => {
	const context = useContext(AppContext)

	// Check if the hook is used within a provider
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider')
	}

	return context
}
