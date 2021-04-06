import {
  Container,
  CssBaseline,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import { Mapping } from "./components/Mapping";
import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4">Code delivery</Typography>
        <Mapping />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
