// src/components/SwapModal.jsx
import React, { useState, useEffect } from 'react';
import { useSwap, TOKENS } from '../hooks/useSwap';
import { useWallet } from '../context/WalletContext';

const SwapModal = ({ isOpen, onClose }) => {
  const { walletAddress, connectWallet } = useWallet();
  const { executeSwap, fetchPoolData, getTokenBalance, isLoading, error: swapError } = useSwap();
  
  // State management
  const [topToken, setTopToken] = useState('SOL');
  const [values, setValues] = useState({ SOL: '', FATHER: '' });
  const [balances, setBalances] = useState({ SOL: 0, FATHER: 0 });
  const [customSlippage, setCustomSlippage] = useState('1');
  const [isEditingSlippage, setIsEditingSlippage] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [swapStatus, setSwapStatus] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [transactionSignature, setTransactionSignature] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Format number helper
  const formatNumber = (value, decimals = 4) => {
    if (!value) return '0';
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  // Clear errors
  const clearErrors = () => {
    setLocalError(null);
    setSwapStatus(null);
    setTransactionSignature(null);
  };

  // Switch tokens
  const switchTokens = () => {
    clearErrors();
    setTopToken(topToken === 'SOL' ? 'FATHER' : 'SOL');
    setValues({
      SOL: values.FATHER,
      FATHER: values.SOL
    });
  };

  // Handle slippage change
  const handleSlippageChange = (value) => {
    if (value === 'custom') {
      setIsEditingSlippage(true);
      return;
    }
    setCustomSlippage(value);
    setIsEditingSlippage(false);
  };

  // Handle custom slippage input
  const handleCustomSlippageChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (parseFloat(value) > 100) return;
    if ((value.match(/\./g) || []).length > 1) return;
    if (value.includes('.') && value.split('.')[1].length > 1) return;
    setCustomSlippage(value);
  };

  // Calculate output amount
  const calculateOtherAmount = (amount, token) => {
    if (!priceData || !amount) return '';
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return '';

    try {
      if (token === 'SOL') {
        const output = (parsedAmount * priceData.price) * (1 - (parseFloat(customSlippage) / 100));
        return formatNumber(output);
      } else {
        const output = (parsedAmount / priceData.price) * (1 - (parseFloat(customSlippage) / 100));
        return formatNumber(output);
      }
    } catch (err) {
      console.error('Error calculating amount:', err);
      return '';
    }
  };

  // Validate amount
  const validateAmount = (value, token) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return false;
    
    if (token === 'SOL') {
      const availableBalance = balances[token] - 0.01;
      if (numValue > availableBalance) {
        setLocalError('Insufficient SOL - reserve needed for fees');
        return false;
      }
    } else {
      if (numValue > balances[token]) {
        setLocalError(`Insufficient ${token} balance`);
        return false;
      }
    }
    return true;
  };

  // Handle amount change
  const handleAmountChange = (inputValue, token) => {
    clearErrors();
    
    const cleanedValue = inputValue.replace(/[^0-9.]/g, '');
    if ((cleanedValue.match(/\./g) || []).length > 1) return;

    const parts = cleanedValue.split('.');
    if (parts[1] && parts[1].length > TOKENS[token].decimals) return;

    const newValues = {
      ...values,
      [token]: cleanedValue
    };

    if (cleanedValue && priceData) {
      const otherToken = token === 'SOL' ? 'FATHER' : 'SOL';
      newValues[otherToken] = calculateOtherAmount(cleanedValue, token);
      validateAmount(cleanedValue, token);
    } else {
      newValues[token === 'SOL' ? 'FATHER' : 'SOL'] = '';
    }

    setValues(newValues);
  };

  // Handle max click
  const handleMaxClick = () => {
    if (!balances[topToken]) return;
    
    let maxAmount;
    if (topToken === 'SOL') {
      maxAmount = Math.max(0, balances[topToken] - 0.01);
    } else {
      maxAmount = balances[topToken];
    }
    
    const formattedAmount = maxAmount.toFixed(TOKENS[topToken].decimals);
    handleAmountChange(formattedAmount, topToken);
  };

  // Calculate USD value
  const getUsdValue = (amount, token) => {
    if (!priceData?.solPrice || !amount) return '0.00';
    const value = parseFloat(amount);
    if (isNaN(value)) return '0.00';
    
    if (token === 'SOL') {
      return (value * priceData.solPrice).toFixed(2);
    } else {
      return (value * priceData.fatherPrice).toFixed(2);
    }
  };

  // Update balances
  const updateBalances = async () => {
    if (!walletAddress) return;

    try {
      const [solBalance, fatherBalance] = await Promise.all([
        getTokenBalance(walletAddress, TOKENS.SOL.mint),
        getTokenBalance(walletAddress, TOKENS.FATHER.mint)
      ]);

      setBalances({
        SOL: solBalance,
        FATHER: fatherBalance
      });
    } catch (err) {
      console.error('Error updating balances:', err);
      setLocalError('Failed to fetch balances');
    }
  };

  // Fetch price data
  const fetchPriceData = async () => {
    try {
      setIsLoadingPrice(true);
      const data = await fetchPoolData();
      setPriceData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching price:', err);
      setLocalError('Failed to fetch price data');
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // Handle swap
  const handleSwap = async () => {
    if (!walletAddress) {
      await connectWallet();
      if (!walletAddress) {
        setLocalError('Please connect your wallet');
        return;
      }
    }

    clearErrors();
    
    const amount = parseFloat(values[topToken]);
    if (!amount || !validateAmount(amount, topToken)) {
      return;
    }

    try {
      setSwapStatus('pending');
      
      const result = await executeSwap(
        walletAddress,
        amount,
        parseFloat(customSlippage),
        topToken
      );

      setSwapStatus('success');
      setTransactionSignature(result.signature);
      setValues({ SOL: '', FATHER: '' });
      
      await Promise.all([
        fetchPriceData(),
        updateBalances()
      ]);
    } catch (err) {
      console.error('Swap failed:', err);
      setSwapStatus('error');
      setLocalError(err.message || 'Swap failed');
    }
  };

  // Setup polling and cleanup
  useEffect(() => {
    if (isOpen && walletAddress) {
      clearErrors();
      fetchPriceData();
      updateBalances();
      
      const priceInterval = setInterval(fetchPriceData, 10000);
      const balanceInterval = setInterval(updateBalances, 20000);
      
      return () => {
        clearInterval(priceInterval);
        clearInterval(balanceInterval);
      };
    }
  }, [isOpen, walletAddress]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setValues({ SOL: '', FATHER: '' });
      setSwapStatus(null);
      setLocalError(null);
      setPriceData(null);
      setTransactionSignature(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (!isOpen) return null;

  // First, ensure you have these SVGs in your public folder:
// /public/jupiter.svg
// /public/raydium.svg
// /public/poweredbyjupiter.svg

if (!isOpen) return null;

return (
  <div className="fixed inset-0 bg-dark/80 z-modal flex items-center justify-center p-4 animate-fade-in"
       onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="bg-modal-bg rounded-lg max-w-md w-full p-6 relative border-2 border-pale-gold animate-slide-up max-h-[90vh] overflow-y-auto"
         onClick={(e) => e.stopPropagation()}>
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-pale-gold hover:text-white transition-colors"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-pale-gold mb-6 font-madimi">
        Swap {topToken} to {topToken === 'SOL' ? 'FATHER' : 'SOL'}
      </h2>

      {/* Error and Success Messages */}
      {(swapError || localError) && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded">
          <p className="text-red-500">{swapError || localError}</p>
        </div>
      )}

      {swapStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded">
          <p className="text-green-500">Swap completed successfully!</p>
        </div>
      )}

      {/* Price Info */}
      {isLoadingPrice ? (
        <div className="mb-4 p-3 bg-input-dark rounded-lg border border-pale-gold/20">
          <div className="animate-pulse text-pale-gold">Loading prices...</div>
        </div>
      ) : priceData && (
        <div className="mb-4 p-3 bg-input-dark rounded-lg border border-pale-gold/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-pale-gold/80">Current Price:</p>
              <p className="text-lg text-pale-gold font-medium">
                1 SOL = {formatNumber(priceData.price, 2)} FATHER
              </p>
            </div>
            <button 
              onClick={fetchPriceData}
              className="p-2 rounded-full bg-input-dark text-pale-gold/60 
                       hover:text-pale-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>
      )}

      {/* First Token Input */}
      <div className="relative bg-input-dark p-4 rounded-lg border border-pale-gold/20 mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-pale-gold">
            You Pay ({topToken})
          </label>
          <span className="text-sm text-pale-gold/60">
            Balance: {formatNumber(balances[topToken])}
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={values[topToken]}
            onChange={(e) => handleAmountChange(e.target.value, topToken)}
            className="w-full bg-transparent text-lg text-pale-gold focus:outline-none"
            placeholder="0.0"
          />
          {balances[topToken] > 0 && (
            <button 
              onClick={handleMaxClick}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 
                       text-xs bg-input-dark text-pale-gold/60 hover:text-pale-gold 
                       rounded transition-colors"
            >
              MAX
            </button>
          )}
        </div>
        {values[topToken] && (
          <div className="mt-2 text-xs text-pale-gold/60">
            ≈ ${getUsdValue(values[topToken], topToken)} USD
          </div>
        )}
      </div>

      {/* Switch Tokens Button */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full border-t border-pale-gold/20"></div>
        </div>
        <div className="relative flex justify-center">
          <button 
            onClick={switchTokens}
            className="bg-modal-bg rounded-full p-2 border-2 border-pale-gold 
                     hover:bg-modal-bg/80 transition-colors text-pale-gold"
          >
            ⇅
          </button>
        </div>
      </div>

      {/* Second Token Input */}
      <div className="relative bg-input-dark p-4 rounded-lg border border-pale-gold/20 mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-pale-gold">
            You Receive ({topToken === 'SOL' ? 'FATHER' : 'SOL'})
          </label>
          <span className="text-sm text-pale-gold/60">
            Balance: {formatNumber(balances[topToken === 'SOL' ? 'FATHER' : 'SOL'])}
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={values[topToken === 'SOL' ? 'FATHER' : 'SOL']}
            className="w-full bg-transparent text-lg text-pale-gold focus:outline-none"
            placeholder="0.0"
            disabled
          />
        </div>
        {values[topToken === 'SOL' ? 'FATHER' : 'SOL'] && (
          <div className="mt-2 text-xs text-pale-gold/60">
            ≈ ${getUsdValue(values[topToken === 'SOL' ? 'FATHER' : 'SOL'], topToken === 'SOL' ? 'FATHER' : 'SOL')} USD
          </div>
        )}
      </div>

      {/* Slippage Settings */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-pale-gold mb-2">
          Slippage Tolerance
        </label>
        <div className="flex gap-2 flex-wrap">
          {['0.1', '0.5', '1', 'custom'].map((value) => (
            <button
              key={value}
              onClick={() => handleSlippageChange(value)}
              className={`px-3 py-1 rounded font-medium border transition-colors
                ${(customSlippage === value || (value === 'custom' && isEditingSlippage))
                  ? 'bg-pale-gold text-dark border-pale-gold' 
                  : 'bg-input-dark text-pale-gold border-pale-gold/20 hover:border-pale-gold'
                }`}
            >
              {value === 'custom' ? 'Custom' : `${value}%`}
            </button>
          ))}
          {isEditingSlippage && (
            <input
              type="text"
              value={customSlippage}
              onChange={handleCustomSlippageChange}
              className="w-20 px-3 py-1 rounded font-medium border border-pale-gold/20 
                       bg-input-dark text-pale-gold focus:outline-none focus:border-pale-gold"
              placeholder="0.0%"
            />
          )}
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={isLoading || !walletAddress || !values[topToken] || !!localError}
        className={`w-full py-3 rounded font-medium transition-all
          ${(isLoading || !walletAddress || !values[topToken] || !!localError)
            ? 'bg-pale-gold/50 text-dark/50 cursor-not-allowed' 
            : 'bg-pale-gold text-dark hover:bg-pale-gold/90 transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Swapping...
          </div>
        ) : !walletAddress ? (
          'Connect Wallet'
        ) : !values[topToken] ? (
          'Enter Amount'
        ) : !!localError ? (
          'Invalid Amount'
        ) : (
          'Swap'
        )}
      </button>

      {/* Transaction Details */}
      {transactionSignature && (
        <div className="mt-4 p-3 bg-input-dark rounded-lg border border-pale-gold/20">
          <p className="text-sm text-pale-gold mb-1">Transaction Details:</p>
          <a
            href={`https://solscan.io/tx/${transactionSignature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-pale-gold/60 hover:text-pale-gold break-all"
          >
            {transactionSignature}
          </a>
        </div>
      )}

      {/* Swap Details */}
      {priceData && values[topToken] && (
        <div className="mt-4 space-y-2 p-3 bg-input-dark rounded-lg border border-pale-gold/20">
          <div className="flex justify-between text-sm">
            <span className="text-pale-gold/60">Rate</span>
            <span className="text-pale-gold">
              1 {topToken} = {formatNumber(topToken === 'SOL' ? priceData.price : 1/priceData.price)} {topToken === 'SOL' ? 'FATHER' : 'SOL'}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-pale-gold/60">Network Fee</span>
            <span className="text-pale-gold">
              {topToken === 'SOL' ? '~0.01 SOL' : '~0.00001 SOL'}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-pale-gold/60">Minimum Received</span>
            <span className="text-pale-gold">
              {formatNumber(values[topToken === 'SOL' ? 'FATHER' : 'SOL'])} {topToken === 'SOL' ? 'FATHER' : 'SOL'}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-pale-gold/60">Slippage Tolerance</span>
            <span className="text-pale-gold">{customSlippage}%</span>
          </div>
        </div>
      )}

      {/* Footer Section with Links */}
      <div className="mt-6 pt-4 border-t border-pale-gold/20">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Raydium Card */}
            <a
              href="https://raydium.io/swap/?outputMint=2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump&inputMint=sol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group hover:scale-105 transition-all duration-200"
            >
              <div className="p-4 bg-input-dark rounded-lg border border-pale-gold/20 
                          hover:border-pale-gold transition-all duration-200 
                          flex flex-col items-center gap-3 hover:bg-input-dark/80">
                <img 
                  src="/raydium.svg" 
                  alt="Raydium" 
                  className="h-16 w-auto"
                />
                <span className="text-base font-medium text-pale-gold group-hover:text-pale-gold/80">
                  Swap on Raydium
                </span>
              </div>
            </a>

            {/* Jupiter Card */}
            <a
              href="https://jup.ag/swap/SOL-2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group hover:scale-105 transition-all duration-200"
            >
              <div className="p-4 bg-input-dark rounded-lg border border-pale-gold/20 
                          hover:border-pale-gold transition-all duration-200 
                          flex flex-col items-center gap-3 hover:bg-input-dark/80">
                <img 
                  src="/jupiter.svg" 
                  alt="Jupiter" 
                  className="h-16 w-12"
                />
                <span className="text-base font-medium text-pale-gold group-hover:text-pale-gold/80">
                  Swap on Jupiter
                </span>
              </div>
            </a>
          </div>

          {/* Powered By Jupiter with SVG */}
          <div className="flex justify-center">
            <img 
              src="/poweredbyjupiter.svg" 
              alt="Powered by Jupiter" 
              className="h-6"
            />
          </div>

          {/* Network Status */}
          <div className="flex items-center gap-2 text-pale-gold/60 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Solana Network</span>
            </div>
            <span>•</span>
            <span>{isLoadingPrice ? 'Updating' : 'Updated'}</span>
            {lastUpdate && <span>at {lastUpdate}</span>}
          </div>
        </div>
      </div>

    </div>
  </div>
);
};

export default SwapModal;
                
                