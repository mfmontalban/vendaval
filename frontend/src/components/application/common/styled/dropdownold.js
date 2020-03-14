import styled from 'styled-components'; 

const Dropdown = styled.div `
    transition: ${props => props.transitionStyled};
    border-radius: ${props => props.radiusStyled};
    background: ${props => props.backgroundStyled};
    color: ${props => props.colorStyled};
    :hover {
      color: ${props => props.colorHoverStyled};
    }
    padding: ${props => props.paddingStyled};

    & button {
      color: ${props => props.colorStyled};
      :hover {
        color: ${props => props.colorHoverStyled};
      }
    }

    & a {
      text-decoration:none;
      color: ${props => props.colorStyled};
      :hover {
        color: ${props => props.colorHoverStyled};
      }
    }
`

export default Dropdown;