import styled from 'styled-components'

export const MapHeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background-color: ${(props) => props.theme.background};
  border-bottom: ${(props) => props.theme.borders[100]};
  box-shadow: ${(props) => props.theme.shadows[100]};
  z-index: 1000;
`

export const MenuItems = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`

export const MenuItem = styled.li`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.fontColor};
`

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0;
  padding: 0;

  svg {
    height: 43px;
    width: 48px;

    .logoText {
      display: none;
    }
  }

  @media (min-width: 768px) {
    svg {
      height: 43px;
      width: 143px;

      .logoText {
        display: block;
      }
    }
  }
`

export const MapMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const MapTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MapTitleInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.white};
    border: ${(props) => props.theme.borders[100]};
  }
`

export const ResponsiveButtonText = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
`
