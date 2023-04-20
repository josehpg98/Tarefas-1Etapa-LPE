import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Pessoa from './componentes/telas/pessoas/Pessoa'
import Tarefa from './componentes/telas/tarefas/Tarefa'


function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route exact="true" path='/' element={<Home/>}/>
        <Route exact="true" path='/pessoas' element={<Pessoa/>}/>
        <Route exact="true" path='/tarefas' element={<Tarefa/>}/>
      </Routes>
    </Router>
  );
}

export default App;
