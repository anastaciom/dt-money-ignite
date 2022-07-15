import {useTransactions } from "../../hooks/useTransactions";
import { TransactionsTableStyle } from "./styles";

export default function TransactionsTable() {
  const {allTransactions} = useTransactions();

  return (
    <TransactionsTableStyle>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat("PT-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  transaction.type === "withdraw"
                    ? Number("-" + transaction.value)
                    : transaction.value
                )}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("PT-BR").format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TransactionsTableStyle>
  );
}
