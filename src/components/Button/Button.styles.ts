import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.green[400]};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: ${(props) => props.theme.type.fontFamily.secondary};
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  line-height: 1;
  font-weight: 400;

  &.d-button--small {
    height: 24px;
  }

  &.d-button--medium {
    height: 36px;
  }

  &.d-button--large {
    height: 48px;
  }

  &.d-button--full-width {
    width: 100%;
  }

  &:active,
  &.d-button--pressed {
    background-color: var(--foreground);
    color: var(--background);
  }

  &.d-button--text {
    background-color: transparent;
    border: none;
    color: var(--foreground);
    padding: 0;
    font-family: ${(props) => props.theme.type.fontFamily.primary};
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toolbar {
    width: 36px;
    height: 36px;
    padding: 4px;
  }

  &.d-button--toolbar svg {
    width: 100%;
    height: auto;
  }

  &.d-button--swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--swatch:active,
  &.d-button--swatch.d-button--pressed {
    background-color: inherit;
    color: inherit;
  }

  &.d-button--toggle {
    border: none;
    background-color: transparent;
    color: var(--foreground);
    padding: 3px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toggle:active,
  &.d-button--toggle.d-button--pressed {
    background-color: transparent;
    color: var(--foreground);
    transform: rotate(45deg);
  }

  /* When .d-button-swatch is hovered or focused increased the size by 15% */
  &.d-button--swatch:hover,
  &.d-button--swatch:focus {
    transform: scale(1.15);
    cursor: pointer;
  }

  &.d-button--swatch.d-button--pressed {
    transform: scale(1.15);
  }

  &.d-button--primary {
    background-color: var(--brand-primary);
    color: var(--background);
    border: 3px solid var(--brand-secondary);
    border-radius: 3px;
    font-weight: 600;
    padding: 4px 10px;
  }

  &.d-button--primary svg {
    fill: var(--background);
    height: 100%;
    width: auto;
  }
`

export const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.green[400]};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-size: 1rem;
  text-decoration: none;
  line-height: 1;
  font-weight: 400;

  &.d-button--small {
    height: 24px;
  }

  &.d-button--medium {
    height: 36px;
  }

  &.d-button--large {
    height: 48px;
  }

  &.d-button--full-width {
    width: 100%;
  }

  &:active,
  &.d-button--pressed {
    background-color: var(--foreground);
    color: var(--background);
  }

  &.d-button--text {
    background-color: transparent;
    border: none;
    color: var(--foreground);
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toolbar {
    width: 36px;
    height: 36px;
    padding: 4px;
  }

  &.d-button--toolbar svg {
    width: 100%;
    height: auto;
  }

  &.d-button--swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--swatch:active,
  &.d-button--swatch.d-button--pressed {
    background-color: inherit;
    color: inherit;
  }

  &.d-button--toggle {
    border: none;
    background-color: transparent;
    color: var(--foreground);
    padding: 3px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toggle:active,
  &.d-button--toggle.d-button--pressed {
    background-color: transparent;
    color: var(--foreground);
    transform: rotate(45deg);
  }

  /* When .d-button-swatch is hovered or focused increased the size by 15% */
  &.d-button--swatch:hover,
  &.d-button--swatch:focus {
    transform: scale(1.15);
    cursor: pointer;
  }

  &.d-button--swatch.d-button--pressed {
    transform: scale(1.15);
  }

  &.d-button--primary {
    background-color: var(--brand-primary);
    color: var(--background);
    border: 3px solid var(--brand-secondary);
    border-radius: 3px;
    font-weight: 600;
    padding: 4px 10px;
  }

  &.d-button--primary svg {
    fill: var(--background);
    height: 100%;
    width: auto;
  }
`
