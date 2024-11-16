import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrencyData } from "./hooks/useCurrencyData";
import { useBlueDollarRate } from "./hooks/useBlueDollarRate";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { RefreshCw } from "lucide-react";
import './styles/globals.css';

function App() {
  const [copAmount, setCopAmount] = React.useState("")
  const [arsAmount, setArsAmount] = React.useState("")

  const {
    data: usdToCop,
    refetch: refetchCopRate,
    isLoading: isLoadingCop,
    isFetching: isFetchingCop,
    error: errorCop,
  } = useCurrencyData()
  const {
    data: usdToArs,
    refetch: refetchArsRate,
    isLoading: isLoadingArs,
    isFetching: isFetchingArs,
    error: errorArs,
  } = useBlueDollarRate()

  const usdToCopValue = usdToCop?.usd['cop'];
  const usdToArsValue = usdToArs?.compra;


  const isUpdating = isFetchingCop || isFetchingArs

  const updateRates = () => {
    refetchCopRate()
    refetchArsRate()
  }

  const handleCopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cop = e.target.value
    setCopAmount(cop)
    const ars =
      cop && usdToCop && usdToArs
        ? ((parseFloat(cop) / Number(usdToCopValue)) * Number(usdToArsValue)).toFixed(2)
        : ""
    setArsAmount(ars)
  }

  const handleArsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ars = e.target.value
    setArsAmount(ars)
    const cop =
      ars && usdToCop && usdToArs
        ? ((parseFloat(ars) / Number(usdToArsValue)) * Number(usdToCopValue)).toFixed(2)
        : ""
    setCopAmount(cop)
  }


  console.log(isUpdating)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <Card className="w-full max-w-md bg-white/90 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-blue-400/30 border-white">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-center text-2xl font-bold">
            Currency Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-100 p-4 text-center transition-all duration-300 hover:bg-blue-200">
              {isLoadingCop ? (
                <div className="animate-pulse">
                  <div className="h-4 rounded bg-blue-200"></div>
                </div>
              ) : (
                <p className="text-sm font-medium text-blue-800">
                  1 USD = {`${usdToCop?.usd['cop'].toFixed(2)}`} COP
                </p>
              )}
            </div>
            <div className="rounded-lg bg-purple-100 p-4 text-center transition-all duration-300 hover:bg-purple-200">
              {isLoadingArs ? (
                <div className="animate-pulse">
                  <div className="h-4 rounded bg-purple-200"></div>
                </div>
              ) : (
                <p className="text-sm font-medium text-purple-800">
                  1 USD = {`${usdToArs?.compra}`} ARS
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cop"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Colombian Peso (COP)
              </label>
              <Input
                type="number"
                id="cop"
                value={copAmount}
                onChange={handleCopChange}
                placeholder="Enter COP amount"
                className="w-full ring-0 transition-all duration-300 focus:border-blue-500 focus:ring-blue-500 border-white text-black bg-white ring-white ring-offset-white"
              />
            </div>
            <div>
              <label
                htmlFor="ars"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Argentine Peso (ARS)
              </label>
              <Input
                type="number"
                id="ars"
                value={arsAmount}
                onChange={handleArsChange}
                placeholder="Enter ARS amount"
                className="w-full transition-all duration-300 focus:ring-purple-500 focus:border-purple-500 border-white text-black bg-white ring-white ring-offset-white"
              />
            </div>
            <Button
              onClick={updateRates}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:from-blue-600 hover:to-purple-600 ${isUpdating ? "animate-pulse" : ""} text-white`}
              disabled={isUpdating}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isUpdating ? "animate-spin" : ""} text-white`}
              />
              {isUpdating ? "Updating..." : "Update Prices"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App;
