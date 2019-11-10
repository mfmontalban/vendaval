import styled from 'styled-components';

const Button = styled.button `
    transition: ${props => props.transitionStyled};
    border-radius: ${props => props.radiusStyled};
    background: ${props => props.backgroundStyled};
    color: ${props => props.colorStyled};
    :hover {
      background: ${props => props.backgroundHoverStyled};
      color: ${props => props.colorHoverStyled};
    }
    padding: ${props => props.paddingStyled};
`

export default Button;