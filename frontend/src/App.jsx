
import {Route, Routes} from "react-router";
import HomePage from './pages/Home'
import CreatePage from './pages/Create'
import NotePage from './pages/Note'

const App = () => {

  return <div data-theme="coffee">

      <Routes>
        <Route path ="/" element ={<HomePage/>} />
        <Route path ="/create" element ={<CreatePage/>} />
        <Route path ="/note/:id" element ={<NotePage/>} />
      </Routes>
    </div>
  
}

export default App;
