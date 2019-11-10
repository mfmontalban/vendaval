import styled from 'styled-components'; 

const Input = styled.input `
transition: ${props => props.transitionStyled};
background: ${props => props.backgroundStyled};
border-radius: ${props => props.radiusStyled};
color: ${props => props.colorStyled};
border-color: ${props => props.borderStyled};
font-size: ${props => props.fontSizeStyled};
::placeholder,
::-webkit-input-placeholder {
  color: ${props => props.placeholderStyled};
}
:-internal-autofill-selected {
  background: ${props => props.backgroundStyled} !important;
  color: ${props => props.colorStyled} !important;
}
:-ms-input-placeholder {
  color: ${props => props.placeholderStyled};
}
:hover {
  background: ${props => props.backgroundHoverStyled};
  color: ${props => props.colorHoverStyled};
}
`

export default Input;