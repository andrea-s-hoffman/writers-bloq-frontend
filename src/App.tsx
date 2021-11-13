import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import StoryForm from "./components/StoryForm";
import { useContext } from "react";
import AuthContext from "./context/authContext";
import Details from "./components/Details";
import PublicStories from "./components/PublicStories";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      {user && <Header />}
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/story-builder" exact>
          <StoryForm />
        </Route>
        <Route path="/:public" exact>
          <PublicStories />
        </Route>
        <Route path="/story/:id" exact>
          <Details />
        </Route>
        <Route path="/">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
