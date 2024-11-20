import { useState } from 'react';
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { struct, u8, blob } from '@solana/buffer-layout';


// SPL Token Account Layout
const SPL_ACCOUNT_LAYOUT = struct([
  blob(32, 'mint'),
  blob(32, 'owner'),
  u8('amount'),
  blob(93)
]);

export const TOKENS = {
  FATHER: {
    mint: '2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump',
    decimals: 9,
    symbol: 'FATHER',
    name: 'FATHER'
  },
  SOL: {
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    symbol: 'SOL',
    name: 'SOL'
  }
};

const RPC_ENDPOINT = "https://mainnet.helius-rpc.com/?api-key=0159511d-3a22-4e84-9fc7-86412b1e9f0e";

export const useSwap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getConnection = () => {
    try {
      return new Connection(RPC_ENDPOINT, 'confirmed');
    } catch (err) {
      console.error('Connection error:', err);
      throw new Error('Failed to connect to Solana network');
    }
  };

  const getTokenBalance = async (walletAddress, tokenMint) => {
    if (!walletAddress) return 0;
    
    try {
      const connection = getConnection();
      const walletPubkey = new PublicKey(walletAddress);

      // Handle SOL balance using getBalance
      if (tokenMint === TOKENS.SOL.mint) {
        const balance = await connection.getBalance(walletPubkey);
        return balance / Math.pow(10, TOKENS.SOL.decimals);
      }

      // For FATHER token, use getParsedTokenAccountsByOwner for more detailed info
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPubkey, {
        mint: new PublicKey(tokenMint)
      });

      // Sum up all balances from token accounts (usually there's just one)
      const totalBalance = tokenAccounts.value.reduce((total, account) => {
        const tokenAmount = account.account.data.parsed.info.tokenAmount;
        return total + (tokenAmount.uiAmount || 0);
      }, 0);

      return totalBalance;

    } catch (err) {
      console.error('Error getting token balance:', err);
      return 0;
    }
  };

  const fetchPoolData = async () => {
    try {
      setIsLoading(true);
      
      // First get SOL price in USD
      const solPriceResponse = await fetch(
        `https://api.jup.ag/price/v2?ids=${TOKENS.SOL.mint}`
      );
      const solPriceData = await solPriceResponse.json();
      const solPriceUSDC = parseFloat(solPriceData.data[TOKENS.SOL.mint]?.price || 0);

      // Get quote for 1 SOL to FATHER to determine price ratio
      const quoteResponse = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.FATHER.mint}&amount=1000000000&slippageBps=50`
      ).then(r => r.json());

      // Calculate FATHER per SOL ratio
      const fatherPerSol = quoteResponse.outAmount / Math.pow(10, TOKENS.FATHER.decimals);
      
      // Calculate FATHER price in USD based on SOL price
      const fatherPriceUSDC = solPriceUSDC / fatherPerSol;

      // Extract liquidity from the best route
      const bestRoute = quoteResponse.routePlan?.[0] || {};
      const poolLiquidity = bestRoute.swapInfo?.inAmount || 0;

      return {
        price: fatherPerSol,
        poolLiquidity: poolLiquidity / 1e9, // Convert from lamports to SOL
        solPrice: solPriceUSDC,
        fatherPrice: fatherPriceUSDC,
        routes: quoteResponse.routePlan || []
      };
    } catch (err) {
      console.error('Error fetching pool data:', err);
      throw new Error('Failed to fetch price data');
    } finally {
      setIsLoading(false);
    }
  };

  const executeSwap = async (walletAddress, amountIn, slippage = 1, inputToken = 'SOL') => {
    if (!walletAddress) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const connection = getConnection();
      const wallet = new PhantomWalletAdapter();
      await wallet.connect();

      const inputMint = TOKENS[inputToken].mint;
      const outputMint = inputToken === 'SOL' ? TOKENS.FATHER.mint : TOKENS.SOL.mint;
      const amountInRaw = Math.floor(amountIn * Math.pow(10, TOKENS[inputToken].decimals));
      const slippageBps = Math.floor(slippage * 100);

      // 1. Get quote
      const quoteResponse = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInRaw}&slippageBps=${slippageBps}`
        )
      ).json();

      if (!quoteResponse?.routePlan?.length) {
        throw new Error('No valid routes found for swap');
      }

      // Log the quote details for debugging
      console.log('Quote details:', {
        inputAmount: amountInRaw,
        outputAmount: quoteResponse.outAmount,
        routes: quoteResponse.routePlan
      });

      // 2. Get swap transaction
      const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: walletAddress,
            wrapAndUnwrapSol: true
          })
        })
      ).json();

      // 3. Deserialize the transaction
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // 4. Get the latest blockhash
      const latestBlockhash = await connection.getLatestBlockhash();
      
      // 5. Request wallet signature
      const signed = await wallet.signTransaction(transaction);

      // 6. Execute the transaction
      const txid = await connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: true,
        maxRetries: 2
      });

      // 7. Confirm transaction
      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: txid
      }, 'confirmed');

      // 8. Return transaction signature
      return {
        signature: txid,
        inputAmount: amountIn,
        outputAmount: quoteResponse.outAmount / Math.pow(10, TOKENS[inputToken === 'SOL' ? 'FATHER' : 'SOL'].decimals),
        routes: quoteResponse.routePlan
      };

    } catch (err) {
      console.error('Swap execution failed:', err);
      setError(err.message || 'Failed to execute swap');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOutputAmount = async (inputAmount, inputToken = 'SOL', slippage = 1) => {
    try {
      if (!inputAmount) return 0;
      
      const inputMint = TOKENS[inputToken].mint;
      const outputMint = inputToken === 'SOL' ? TOKENS.FATHER.mint : TOKENS.SOL.mint;
      const amountInRaw = Math.floor(inputAmount * Math.pow(10, TOKENS[inputToken].decimals));
      const slippageBps = Math.floor(slippage * 100);

      const quoteResponse = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInRaw}&slippageBps=${slippageBps}`
      ).then(r => r.json());

      if (!quoteResponse?.outAmount) return 0;

      return quoteResponse.outAmount / Math.pow(10, TOKENS[inputToken === 'SOL' ? 'FATHER' : 'SOL'].decimals);
    } catch (err) {
      console.error('Error calculating output amount:', err);
      return 0;
    }
  };

  return {
    executeSwap,
    fetchPoolData,
    getTokenBalance,
    calculateOutputAmount,
    isLoading,
    error,
    TOKENS
  };
};