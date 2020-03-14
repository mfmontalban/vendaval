import styled from 'styled-components'; 

const InputArea = styled.textarea `
background: ${props => props.backgroundStyled};
border-radius: ${props => props.radiusStyled};
color: ${props => props.colorStyled};
border-color: ${props => props.borderStyled};
font-size: ${props => props.fontSizeStyled};
::placeholder,
::-webkit-input-placeholder {
  color: ${props => props.placeholderStyled};
}
:-ms-input-placeholder {
  color: ${props => props.placeholderStyled};
}
`

export default InputArea;