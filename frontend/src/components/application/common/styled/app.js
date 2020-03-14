import styled from 'styled-components'; 

const App = styled.div `
    transition: ${props => props.transitionStyled};    
    width: ${props => props.widthStyled};
    background: ${props => props.backgroundStyled};
    padding: ${props => props.paddingStyled};
`

export default App;