import './App.css';
import Calculator from "./calculator"

function App() {
  return (
    <div className="App">
      <div className="navBar">
        <h2>Calculator</h2>
        <div className="dummybar"></div>
        <h3><a href="https://arcanewright.com">Arcane Wright Home</a></h3>
      </div>
      <Calculator></Calculator>
      <div className="footer">
        <p>This is my first published project. I decided to finally write something I felt comfortable putting up and finishing. Finished on 5/28/2021, using create-react-app. Source Code on GitHub.</p>
        <p>Update: 5/30/2021 fixed based on feedback.</p>
      </div>
    </div>
  );
}

export default App;
