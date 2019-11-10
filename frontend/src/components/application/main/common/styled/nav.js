import styled from 'styled-components'; 

const Nav = styled.nav `
    width: ${props => props.navWidth};
    height: ${props => props.navHeight};
    background: ${props => props.navBackground};
    border-radius: ${props => props.navRadius};
`

export default Nav;
