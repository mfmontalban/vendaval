import styled from 'styled-components'; 

const DropdownDivider = styled.div `
    height: 0;
    margin: .25rem 0;
    overflow: hidden;
    border-top: 1px solid;
    border-top-color: ${props => props.colorStyled};
`

export default DropdownDivider;