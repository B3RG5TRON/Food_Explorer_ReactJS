import { Container, Content, Brand } from "./style"
import polygonFooter from "../../assets/icons/polygonFooter.svg"
import { FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <Container>
      <Content>
        <Brand>
          <img src={polygonFooter} alt="Logo Food Explorer" />
          <h1>Food Explorer</h1>
        </Brand>

        <div>
          <p>© 2025 - Todos os direitos reservados.</p>
          <a target="_blank" href="https://www.linkedin.com/in/eduardo-bergstron-986108143/" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </Content>
    </Container>
  )
}
