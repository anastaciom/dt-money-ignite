import Logo from "../../assets/logo.svg";
import { ContentStyle, HeaderStyle } from "./Styles";
interface HeaderProps {
  onOpenTransactionModal: () => void;
}
export default function Header({ onOpenTransactionModal }: HeaderProps) {
  return (
    <HeaderStyle>
      <ContentStyle>
        <img src={Logo} alt="logo-cifrão" />
        <button type="button" onClick={onOpenTransactionModal}>
          Nova Transação
        </button>
      </ContentStyle>
    </HeaderStyle>
  );
}
