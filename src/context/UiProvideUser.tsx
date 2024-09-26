"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

// Definir el tipo para los datos del cliente
export interface CustomerData {
  dniRuc: string;
  nombre: string;
  direccion: string;
  celular: string;
}

// Definir el tipo para el contexto
type CustomerContextType = [
  CustomerData | null,
  React.Dispatch<React.SetStateAction<CustomerData | null>>
];

export const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("customerData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (customerData) {
        localStorage.setItem("customerData", JSON.stringify(customerData));
      } else {
        localStorage.removeItem("customerData");
      }
    }
  }, [customerData]);

  return (
    <CustomerContext.Provider value={[customerData, setCustomerData]}>
      {children}
    </CustomerContext.Provider>
  );
};

// Hook para usar el contexto
export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
};
