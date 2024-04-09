// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deadstock from './Pages/Deadstock';
import HomePage from './Pages/HomePage';
import Histroycard from './Pages/Historycard';
import Check from './Pages/Check'; // Import the Check component 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Deadstock />}>
          <Route path='check' element={<Check />} />
        </Route>
        <Route path='/history_card' element={<Histroycard />} />
      </Routes>
    </Router>
  );
}

export default App;
