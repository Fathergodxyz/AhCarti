// src/context/WalletContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = useCallback(async (options = {}) => {
    try {
      if (!window?.phantom?.solana) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const provider = window.phantom?.solana;
      const response = await provider.connect(options);
      const address = response.publicKey.toString();
      setWalletAddress(address);
      return address;
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setWalletAddress(null);
      throw err;
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      const provider = window.phantom?.solana;
      if (provider) {
        await provider.disconnect();
        setWalletAddress(null);
        
        // Force disconnect and cleanup
        if (provider.listeners('disconnect').length > 0) {
          provider.removeAllListeners('disconnect');
        }
      }
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
      // Still clear the wallet address even if there's an error
      setWalletAddress(null);
    }
  }, []);

  // Listen for disconnect events from Phantom
  React.useEffect(() => {
    const provider = window.phantom?.solana;
    if (provider) {
      const handleDisconnect = () => {
        console.log('Wallet disconnected');
        setWalletAddress(null);
      };

      provider.on('disconnect', handleDisconnect);

      return () => {
        provider.removeListener('disconnect', handleDisconnect);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      walletAddress, 
      connectWallet, 
      disconnectWallet,
      isConnected: !!walletAddress 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};