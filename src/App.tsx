import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="App">
        <h1>FoundersLab</h1>
        <Link to="/login">Get Started</Link>
      </div>
    </>
  );
};

export default App;
