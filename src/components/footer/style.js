import { styled } from "styled-components"
import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakPoints"

export const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background: ${({ theme }) => theme.COLORS.Dark600};
  user-select: none;
`

export const Content = styled.div`
  max-width: 117rem;
  max-height: 7.7rem;
  padding: 2.4rem 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0 auto;

  > div:last-child {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    gap: 0.5rem;

    > p {
      color: ${({ theme }) => theme.COLORS.Light200};
      font-family: var(--roboto-font-family);
      font-size: clamp(1.1rem, 2.6vw, 1.4rem);
      font-weight: 400;
      user-select: none;
    }

    > a {
      display: flex;
      align-items: center;
      padding-bottom: .3rem;

      > svg {
        color: ${({ theme }) => theme.COLORS.Light200};
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    padding: 2.4rem 2rem;
  }
`

export const Brand = styled.div`
  user-select: none;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 0.5vw, 1rem);
  padding-bottom: .2rem;

  > img {
    width: clamp(2rem, 3vw, 3rem);
    height: clamp(2rem, 3vw, 3rem);
  }

  > h1 {
    color: ${({ theme }) => theme.COLORS.Light700};
    font-family: var(--roboto-font-family);
    font-size: clamp(1.4262rem, 2.5vw, 2.4rem);
    font-weight: 700;
    white-space: nowrap;
  }
`
