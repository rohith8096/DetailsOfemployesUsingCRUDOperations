import'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeDetails from './EmployeDetails';
import CreateEmployeDetails from './CreateEmployeDetails';
import UpdateEmployeDetails from './UpdateEmployeDetails';
import ViewEmployeDetails from './ViewEmployeDetails';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeDetails />}></Route>
          <Route path='/create' element={<CreateEmployeDetails />}></Route>
          <Route path='/update/:id' element={<UpdateEmployeDetails />}></Route>
          <Route path='/view/:id' element={<ViewEmployeDetails />}></Route>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
