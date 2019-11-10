import styled from 'styled-components'; 

const TopNav = styled.div `
    background: ${props => props.backgroundStyled};
    height: ${props => props.heightStyled};
    width: ${props => props.widthStyled};
    padding-top: ${props => props.paddingTopStyled};
    padding-left: ${props => props.paddingLeftStyled};
    padding-right: ${props => props.paddingRightStyled};
    margin-bottom: ${props => props.marginBottomStyled};
`

export default TopNav;