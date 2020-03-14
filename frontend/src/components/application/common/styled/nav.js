import styled from 'styled-components'; 

const Nav = styled.nav `
    transition: ${props => props.transitionStyled};
    background: ${props => props.backgroundStyled};
    min-height: ${props => props.minHeightStyled};
    height: ${props => props.heightStyled};
    width: ${props => props.widthStyled};
    border-radius: ${props => props.radiusStyled};
    border-color: ${props => props.borderStyled};
    border-top-color: ${props => props.borderTopStyled};
    border-bottom-color: ${props => props.borderBottomStyled};
    color: ${props => props.colorStyled};
    font-size: ${props => props.fontSizeStyled};
    padding: ${props => props.paddingStyled};
    padding-top: ${props => props.paddingTopStyled};
    padding-left: ${props => props.paddingLeftStyled};
    padding-right: ${props => props.paddingRightStyled};
    padding-bottom: ${props => props.paddingBottomStyled};
    margin: ${props => props.marginStyled};
    margin-top: ${props => props.marginTopStyled};
    margin-left: ${props => props.marginLeftStyled};
    margin-right: ${props => props.marginRightStyled};
    margin-bottom: ${props => props.marginBottomStyled};
    :hover {
        background: ${props => props.backgroundHoverStyled};
        color: ${props => props.colorHoverStyled};
        border-color: ${props => props.borderHoverStyled};
        border-bottom-color: ${props => props.borderBottomHoverStyled};
    }
`

export default Nav;
