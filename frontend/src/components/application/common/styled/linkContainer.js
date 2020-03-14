import styled from 'styled-components'; 

const LinkContainer = styled.div `
    transition: ${props => props.transitionStyled};
    background: ${props => props.backgroundStyled};
    border-radius: ${props => props.radiusStyled};
    font-size: ${props => props.fontSizeStyled};
    color: ${props => props.colorStyled};
    :hover {
      color: ${props => props.colorHoverStyled};
    }
`

export default LinkContainer;