import {ToastProvider} from 'contexts/Toast';
import {useToasts} from 'contexts/Toast';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import RenderRouter from 'routes';
import {useSelector} from 'stores';
function App() {
  const {
    message: alertMsg,
    alertType,
    loading,
  } = useSelector(state => state.application);
  const message = useToasts();

  useEffect(() => {
    if (alertMsg && !loading) {
      message('Success', alertType);
    }
  }, [alertMsg, alertType, loading]);
  return (
    <BrowserRouter>
      <ToastProvider>
        <RenderRouter />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
