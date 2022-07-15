import { SummaryStyle, SummaryCardStyle } from "./styles";
import IncomeImg from "../../assets/income.svg";
import OutcomeImg from "../../assets/outcome.svg";
import total from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function Summary() {
  const { allTransactions } = useTransactions();
  const [showValue, setShowValue] = useState({
    showDeposit: false,
    showWithdraw: false,
    showTotal: false,
  });
  const summary = allTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.value;
        acc.total += transaction.value;
      } else {
        acc.withdraws += transaction.value;
        acc.total -= transaction.value;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );
  return (
    <SummaryStyle>
      <SummaryCardStyle
        onClick={() =>
          setShowValue({ ...showValue, showDeposit: !showValue.showDeposit })
        }
      >
        <header>
          {showValue.showDeposit ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
          <p>Entradas</p>
          <img src={IncomeImg} alt="Entradas" />
        </header>
        <strong className={!showValue.showDeposit ? "hideValue" : ""}>
          {new Intl.NumberFormat("PT-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </SummaryCardStyle>

      <SummaryCardStyle
        onClick={() =>
          setShowValue({ ...showValue, showWithdraw: !showValue.showWithdraw })
        }
      >
        <header>
          {showValue.showWithdraw ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
          <p>Saídas</p>
          <img src={OutcomeImg} alt="Saídas" />
        </header>
        <strong className={!showValue.showWithdraw ? "hideValue" : ""}>
          -
          {new Intl.NumberFormat("PT-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </strong>
      </SummaryCardStyle>

      <SummaryCardStyle
        className={
          summary.withdraws > summary.total ? "negative-bg" : "positive-bg"
        }
        onClick={() =>
          setShowValue({ ...showValue, showTotal: !showValue.showTotal })
        }
      >
        <header>
          {showValue.showTotal ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
          <p>Total</p>
          <img src={total} alt="Total" />
        </header>
        <strong className={!showValue.showTotal ? "hideValue" : ""}>
          {new Intl.NumberFormat("PT-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </SummaryCardStyle>
    </SummaryStyle>
  );
}
