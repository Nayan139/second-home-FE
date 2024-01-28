import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStateProvider from "./Context/GlobalState";
import SecondHomeRoutes from "./Routes";

function App() {
  return (
    <div>
      <Router>
        <GlobalStateProvider>
          <SecondHomeRoutes />
        </GlobalStateProvider>
      </Router>
    </div>
  );
}

export default App;
