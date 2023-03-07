import { createGlobalStyle } from 'styled-components'

export const Root = createGlobalStyle`

html {
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  font: sans-serif;
  font-size: ${(props) => props.theme.type.baseFontSize};
  line-height: ${(props) => props.theme.type.baseLineHeight};
  overflow-y: scroll;
}
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: ${(props) => props.theme.foreground};
  font-family: ${(props) => props.theme.type.fontFamily.primary};
  font-weight: normal;
  margin: 0;
  word-wrap: break-word;
  width: 100%;
}

.map-page {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

#___gatsby {
  width: 100%;
  height: 100%;
}

#___gatsby #gatsby-focus-wrapper {
  min-height: 100vh;
  min-width: 100%;
  display: flex;
  flex-direction: column;
}


a {
    cursor: pointer;
}
`

export default Root
