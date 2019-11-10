import styled from 'styled-components'; 

const NavBackground = styled.nav `
    width: ${props => props.navWidth};
    height: ${props => props.navHeight};
    background: ${props => props.navBackground};
`

export default NavBackground;
