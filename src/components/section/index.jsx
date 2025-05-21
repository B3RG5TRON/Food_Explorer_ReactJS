import { Container } from "./style"

export default function Section({ title, children }) {
  return (
    <Container>
      <div />
      <h2>{title}</h2>
      {children}
      <div />
    </Container>
  )
}
