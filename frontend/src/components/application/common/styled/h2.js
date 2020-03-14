import styled from 'styled-components'; 

const H2 = styled.h2 `
background: ${props => props.backgroundStyled};
border-radius: ${props => props.radiusStyled};
color: ${props => props.colorStyled};
font-size: ${props => props.fontSizeStyled};
`

export default H2;