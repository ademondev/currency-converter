import { useQuery } from "react-query";

interface CurrencyData {
  date: string;
  usd: Record<string, number>;
}

const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
export const useCurrencyData = () => {
  return useQuery<CurrencyData, Error>({
    queryKey: ["currencyData"],
    queryFn: async () => fetch(url).then((res) => res.json()), // Function to fetch the data
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
