import styled from 'styled-components'; 

const Body = styled.div `
    height: ${props => props.heightStyled};
    width: ${props => props.widthStyled};
    background: ${props => props.backgroundStyled};
    border-radius: ${props => props.radiusStyled};
    color: ${props => props.colorStyled};
    padding-top: ${props => props.paddingTopStyled};
    margin-left: ${props => props.marginLeftStyled};
    margin-right: ${props => props.marginRightStyled};
    margin-bottom: ${props => props.marginBottomStyled};
`

export default Body;