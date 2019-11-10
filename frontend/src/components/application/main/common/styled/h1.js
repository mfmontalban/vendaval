import styled from 'styled-components'; 

const H1 = styled.h1 `
background: ${props => props.backgroundStyled};
border-radius: ${props => props.radiusStyled};
color: ${props => props.colorStyled};
font-size: ${props => props.fontSizeStyled};
`

export default H1;