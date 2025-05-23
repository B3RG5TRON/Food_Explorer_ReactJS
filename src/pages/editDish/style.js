import { styled } from "styled-components"
import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakPoints"

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`
export const Content = styled.div`
  margin-top: 11.4rem;
  overflow-x: hidden;

  > div {
    width: 100%;
    padding-top: 2.4rem;

    > div {
      width: 112rem;
      margin: 0 auto;
      padding: 0 2rem;
    }
  }
`

export const Main = styled.main`
  flex-grow: 1;
  padding: 2.4rem 2.4rem 9.4rem 2.4rem;
  max-width: 112rem;
  margin: 3.2rem auto 0;
  margin-top: 3.2rem;

  > h2 {
    color: ${({ theme }) => theme.COLORS.Light300};
    font-family: var(--poppins-font-family);
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 500;
    margin-top: 2.2rem;
   
  }

  > div:last-child {
    width: 100%;
    margin: 3.2rem 0 3.2rem;
    display: flex;
    justify-content: flex-end;
    gap: 3.2rem;
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
    > h2 {
      margin-bottom: 2.4rem;
    }

    > div:last-child {
      margin-bottom: 5.308rem;
    }
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.SM}) {
    > div:last-child {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`

export const ContentForm = styled.div`
  display: flex;
  gap: 3.2rem;

  > div:first-child {
    > label {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      > img {
        cursor: pointer;
        object-fit: cover;
        border-radius: 9999rem;
        width: clamp(20rem, 23vw, 25rem);
        height: clamp(20rem, 23vw, 25rem);
      }

      @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
        padding-bottom: 1rem;
        > img {
          margin-bottom: 1.8rem;
        }
      }
    }

    > p {
      margin-top: 1rem;
      font-size: 1.2rem;
      font-family: var(--poppins-font-family);
      font-weight: 500;
      color: ${({ theme }) => theme.COLORS.TintsTomato400};
    }
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
    display: block;

    > div:first-child {
      > label {
        margin-bottom: 1rem;

        > div {
          width: 100%;
        }
      }

      > p {
        margin-bottom: 2rem;
      }
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    gap: 3.2rem;

    > label:first-child {
      width: 44%;
    }

    > div {
      margin-bottom: 0;

      > Input {
        border-color: ${({ theme }) => theme.COLORS.Dark800};
        margin-top: 1.6rem;

        transition: all 0.5s ease;

        &:hover {
          border: 0.1rem solid ${({ theme }) => theme.COLORS.Light400};
        }
      }
    }

    > label:last-child {
      color: ${({ theme }) => theme.COLORS.Light400};
      font-family: var(--roboto-font-family);
      font-size: 1.6rem;
      font-weight: 400;
      min-width: 18rem;

      > div {
        position: relative;

        > svg {
          position: absolute;
          top: 2.9rem;
          right: 1.4rem;
          font-size: 2.4rem;
          color: ${({ theme }) => theme.COLORS.Light400};
        }

        > select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          width: 100%;
          height: 4.8rem;
          padding: 1.2rem 1.4rem;
          margin-top: 1.6rem;
          border-radius: 0.8rem;
          background: ${({ theme }) => theme.COLORS.Dark900};
          border-color: ${({ theme }) => theme.COLORS.Dark800};

          color: ${({ theme }) => theme.COLORS.Light400};
          font-family: var(--roboto-font-family);
          font-size: 1.4rem;
          font-weight: 400;

          transition: all 0.5s ease;

          &:hover {
            border: 0.1rem solid ${({ theme }) => theme.COLORS.Light400};
          }
        }
      }
    }

    @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
      flex-direction: column;
      gap: 2.4rem;

      > label:first-child {
        width: 100%;
      }

      > label {
        width: 100%;
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    align-items: start;
    gap: 3.2rem;

    > div:nth-child(1) {
      width: 100%;

      > h2 {
        color: ${({ theme }) => theme.COLORS.Light400};
        font-family: var(--roboto-font-family);
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 1.6rem;
      }

      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: start;
        gap: 1.6rem;
        min-width: 60rem;
        min-height: 4.8rem;
        padding: 0.4rem 0.8rem;
        border-radius: 0.8rem;
        background: ${({ theme }) => theme.COLORS.Dark900};
      }

      @media (max-width: 656px) {
        > div {
          min-width: 0;
        }
      }
    }

    > div:nth-child(2) {
      max-width: 25.1rem;
      height: 100%;
      margin-bottom: 0;

      > Input {
        background: ${({ theme }) => theme.COLORS.Dark900};
        border-color: ${({ theme }) => theme.COLORS.Dark800};
        margin-top: 1.6rem;

        transition: all 0.5s ease;

        &:hover {
          border: 0.1rem solid ${({ theme }) => theme.COLORS.Light400};
        }
      }
    }

    @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
      flex-direction: column;
      gap: 2.4rem;

      > div:nth-child(2) {
        max-width: 100%;
      }
    }
  }

  > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    > h2 {
      color: ${({ theme }) => theme.COLORS.Light400};
      font-family: var(--roboto-font-family);
      font-size: 1.6rem;
      font-weight: 400;
      margin-bottom: 1.6rem;
    }

    > textarea {
      width: 100%;
      height: ${({ $heightValid }) => ($heightValid ? "12.6rem" : "23.5rem")};
      padding: 1.4rem;
      border: 0.1rem solid ${({ theme }) => theme.COLORS.Dark800};
      border-radius: 0.8rem;
      background: ${({ theme }) => theme.COLORS.Dark900};

      color: ${({ theme }) => theme.COLORS.Light100};
      font-family: var(--roboto-font-family);
      font-size: 1.6rem;
      font-weight: 400;
      resize: none;
      caret-color: auto;

      &::placeholder {
        color: ${({ theme }) => theme.COLORS.Light500};
      }

      transition: border 0.5s ease;

      &:hover {
        border: 0.1rem solid ${({ theme }) => theme.COLORS.Light400};
      }
    }
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.LG}) {
    gap: 2.4rem;
  }
`
