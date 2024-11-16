import { useQuery } from "react-query";

// Define the expected data structure for the API response
interface DollarData {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

// Custom hook to fetch the blue dollar rate
export const useBlueDollarRate = () => {
  return useQuery<DollarData, Error>({
    queryKey: ["blueDollarRate"], // Unique key for caching and refetching
    queryFn: async () =>
      fetch("https://dolarapi.com/v1/dolares/blue").then((res) => res.json()), // Function to fetch the data
    staleTime: 60 * 1000, // Data is fresh for 1 minute
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};
