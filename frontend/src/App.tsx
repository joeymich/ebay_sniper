import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<p>hello world</p>} />
      </Routes>
    </div>
  );
}

export default App;
