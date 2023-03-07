import styled from 'styled-components'

export const LoaderContainer = styled.div`
  z-index: 9999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease-in-out;

  &.loading,
  &.loaded {
    background-color: ${(props) => props.theme.background};
  }

  @media ${(props) => props.theme.media.minWidth['md']} {
    &.loading {
      background-color: ${(props) => props.theme.background};
    }

    &.loaded {
      background-color: rgba(0, 0, 0, 0.45);
    }
  }
`

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  padding: ${(props) => props.theme.spacing['xs']};
  max-width: ${(props) => props.theme.shapes.sizes.widths['xl']};
  border-radius: ${(props) => props.theme.shapes.borderRadius['md']};

  @media ${(props) => props.theme.media.minWidth['md']} {
    padding: ${(props) => props.theme.spacing['md']};
  }
`

export const MapGridWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing['md']};
  background-color: ${(props) => props.theme.background};
  padding: 0;

  @media ${(props) => props.theme.media.minWidth['md']} {
    padding: ${(props) => props.theme.spacing['sm']};
    border: 1px solid ${(props) => props.theme.colors.green[400]};
    border-radius: ${(props) => props.theme.shapes.borderRadius['md']};
  }
`

export const MapGrid = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  grid-gap: ${(props) => props.theme.spacing['sm']};
`

export const MapScreenshotWrapper = styled.div`
  background-color: ${(props) => props.theme.foreground};
  width: 100%;
  height: 100%;
  max-height: ${(props) => props.theme.shapes.sizes.heights['xs']};
  border-radius: ${(props) => props.theme.shapes.borderRadius['md']};
  border: 2px solid ${(props) => props.theme.colors.gray[600]};
`

export const MapStatus = styled.div`
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.type.fontSize['xs']};
  font-weight: ${(props) => props.theme.type.fontWeight[600]};
  color: ${(props) => props.theme.colors.gray[500]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

export const MapInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const MapGridItem = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.shapes.borderRadius['md']};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, auto);
  grid-column-gap: ${(props) => props.theme.spacing['xs']};
  grid-row-gap: ${(props) => props.theme.spacing['sm']};
  align-items: center;
  padding: ${(props) => props.theme.spacing['xs']};
  box-shadow: ${(props) => props.theme.shadows[200]};

  ${MapScreenshotWrapper} {
    grid-area: 1 / 1 / 5 / 5;
  }
  ${MapStatus} {
    grid-area: 1 / 5 / 2 / 13;
  }

  ${MapInfo} {
    grid-area: 2 / 5 / 5 / 13;
  }

  .resume-button {
    grid-area: 5 / 1 / 6 / 13;
  }
  .delete-button {
    grid-area: 6 / 1 / 7 / 13;
  }

  @media ${(props) => props.theme.media.minWidth['md']} {
    grid-template-columns: repeat(12, 1fr);
    padding: ${(props) => props.theme.spacing['sm']};
    grid-gap: ${(props) => props.theme.spacing['sm']};

    ${MapScreenshotWrapper} {
      grid-area: 1 / 1 /7 / 4;
    }
    ${MapStatus} {
      grid-area: 1 / 4 / 2 / 13;
    }
    ${MapInfo} {
      grid-area: 2 / 4 / 7 / 9;
    }
    .resume-button {
      box-sizing: border-box;
      grid-area: 2 / 9 / 7 / 11;
    }
    .delete-button {
      grid-area: 2 / 11 / 7 / 13;
    }
  }
`

export const MapGridHeader = styled.p`
  font-size: ${(props) => props.theme.type.fontSize['sm']};
  font-weight: ${(props) => props.theme.type.fontWeight[700]};
  line-height: ${(props) => props.theme.type.lineHeight['xs']};
  margin: 0 0 ${(props) => props.theme.spacing['sm']};
  text-align: center;
`

export const MapScreenshot = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => props.theme.shapes.borderRadius['sm']};
  margin-bottom: 0;
`

export const MapTitle = styled.h5`
  font-size: ${(props) => props.theme.type.fontSize['h5']};
  font-weight: ${(props) => props.theme.type.fontWeight[700]};
  line-height: ${(props) => props.theme.type.lineHeight['xs']};
  margin: 0;
`

export const MapDescription = styled.p`
  font-size: ${(props) => props.theme.type.fontSize['sm']};
  font-weight: ${(props) => props.theme.type.fontWeight[400]};
  color: ${(props) => props.theme.colors.gray[500]};
  margin-bottom: 0;
`

export const MapMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  small {
    color: ${(props) => props.theme.colors.gray[500]};
    font-size: ${(props) => props.theme.type.fontSize['xs']};
  }
`

export const ModuleDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ModuleTitle = styled.h4`
  font-size: ${(props) => props.theme.type.fontSize['h4']};
  font-weight: ${(props) => props.theme.type.fontWeight[700]};
  margin: 0 0 ${(props) => props.theme.spacing['sm']};
  text-align: center;
`

export const ModuleDescription = styled.p`
  font-size: ${(props) => props.theme.type.fontSize['sm']};
  font-weight: ${(props) => props.theme.type.fontWeight[400]};
  margin-bottom: 0;
  text-align: center;
`

export const ModuleMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing['sm']};
  color: ${(props) => props.theme.colors.gray[500]};
  font-size: ${(props) => props.theme.type.fontSize['xs']};
  text-align: center;
`
