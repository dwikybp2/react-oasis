import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='horizontal'>
          <Heading as='h1'>THe wild</Heading>

          <div>
          <Heading as='h2'>THe wild</Heading>
          <Button onClick={() => alert('Check In')}>Check In</Button>
          <Button onClick={() => alert('Check Out')}>Check In</Button>
          </div>
        </Row>

        <Row type='vertical'>
          <Heading as='h3'>THe wild</Heading>

          <form>
          <Input type="number" placeholder="Number of guest" />
          <Input type="number" placeholder="Number of guest" />
          </form>
        </Row>
      </StyledApp>
    </>
  )
}

export default App
