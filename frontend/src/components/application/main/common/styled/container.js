import styled from 'styled-components'; 

const Container = styled.div `
  height: ${props => props.heightStyled};
  background: ${props => props.containerBackground};
  border-radius: ${props => props.containerRadius};
  padding-right: 5px;
`

export default Container;