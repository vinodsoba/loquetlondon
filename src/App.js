import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './layout/Homepage'
import Completed from './layout/Completed'
import ThankYou from './layout/ThankYou'



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Homepage />} />
        <Route exact path="/completed" element={ <Completed />} />
        <Route exact path="/thankyou" element={ <ThankYou />} />
      </Routes>
    </Router>
    
  );
}

export default App;

