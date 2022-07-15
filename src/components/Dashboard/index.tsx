import Summary from "../Summary";
import TransactionsTable from "../TransactionsTable";
import { MainSectionStyle } from "./styles";

export default function Dashboard() {
  return (
    <MainSectionStyle>
      <Summary />
      <TransactionsTable/>
    </MainSectionStyle>
  );
}
