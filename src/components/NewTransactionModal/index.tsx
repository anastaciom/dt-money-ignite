import Modal from "react-modal";
import { ContentModalStyle, BoxTransactionTypeStyle, RadioBtn } from "./styles";
import closeIcon from "../../assets/close.svg";
import IncomeImg from "../../assets/income.svg";
import OutcomeImg from "../../assets/outcome.svg";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";


interface NewTransactionModalProps {
  isNewTransactionModalOpen: boolean;
  handleCloseTransactionModal(): void;
}

interface IDataForm {
  title: string;
  value: number;
  category: string;
  type: string;
}

export default function NewTransactionModal({
  isNewTransactionModalOpen,
  handleCloseTransactionModal,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");

  const [dataForm, setDataForm] = useState({
    category: "",
    title: "",
    type: type,
    value: 0,
  } as IDataForm);

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();
    await createTransaction(dataForm);
    handleCloseTransactionModal();
  }

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    return setDataForm({
      ...dataForm,
      [e.target.name]:
        e.target.name === "value" ? Number(e.target.value) : e.target.value,
    });
  }

  useEffect(() => {
    setDataForm({
      ...dataForm,
      type: type,
    });
  }, [type]);

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseTransactionModal}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Fechar modal" />
      </button>
      <ContentModalStyle onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          onChange={handleChangeValue}
        />
        <input
          type="number"
          name="value"
          placeholder="Valor"
          onChange={handleChangeValue}
        />

        <BoxTransactionTypeStyle>
          <RadioBtn
            type="button"
            isActive={type === "deposit"}
            activeColor={"green"}
            onClick={() => setType("deposit")}
          >
            <img src={IncomeImg} alt="Entrada" />
            <span>Entradas</span>{" "}
          </RadioBtn>
          <RadioBtn
            type="button"
            isActive={type === "withdraw"}
            activeColor={"red"}
            onClick={() => setType("withdraw")}
          >
            <img src={OutcomeImg} alt="Saídas" />
            <span>Saídas</span>{" "}
          </RadioBtn>
        </BoxTransactionTypeStyle>
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          onChange={handleChangeValue}
        />
        <button type="submit">Cadastrar</button>
      </ContentModalStyle>
    </Modal>
  );
}
