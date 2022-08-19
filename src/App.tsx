import {ToastProvider} from 'contexts/Toast';
import {BrowserRouter} from 'react-router-dom';
import RenderRouter from 'routes';
function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <RenderRouter />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
