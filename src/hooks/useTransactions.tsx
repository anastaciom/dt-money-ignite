import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface IResponse {
  id: string;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
}
type IDataForm = Omit<IResponse, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  allTransactions: IResponse[];
  createTransaction: (data: IDataForm) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [allTransactions, setAllTransactions] = useState<IResponse[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setAllTransactions(response.data.transactions));
  }, []);

  async function createTransaction(data: IDataForm) {
    const response = await api.post("/transactions", {
      ...data,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    return setAllTransactions([...allTransactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{ allTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
