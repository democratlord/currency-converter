import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface CurrencyContextType {
  baseCurrency: string;
  targetCurrency: string;
  convertedAmount: number | null;
  exchangeRate: number | null;
  amount: string;
  currencyList: string[];
  setAmount: (value: string) => void;
  setBaseCurrency: (currency: string) => void;
  setTargetCurrency: (currency: string) => void;
  convertCurrency: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const BASE_URL = "https://api.frankfurter.app";

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<string>("1");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/currencies`);
      setCurrencyList(Object.keys(response.data));
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount || !baseCurrency || !targetCurrency) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`
      );
      setConvertedAmount(response.data.rates[targetCurrency]);
      setExchangeRate(response.data.rates[targetCurrency] / parseFloat(amount));
    } catch (error) {
      console.error("Failed to convert currency:", error);
      setConvertedAmount(null);
      setExchangeRate(null);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        targetCurrency,
        convertedAmount,
        exchangeRate,
        amount,
        currencyList,
        setAmount,
        setBaseCurrency,
        setTargetCurrency,
        convertCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
