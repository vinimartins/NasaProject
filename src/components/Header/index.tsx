import { Container, Content } from "./styles";
import logoImg from "../../assets/a.gif";
import secondImg from "../../assets/logo.jpg";

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Nasa Api" />
        <img src={secondImg} alt="Nasa Api" />
      </Content>
    </Container>
  );
}
