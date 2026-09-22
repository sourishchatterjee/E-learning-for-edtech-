import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import appRouter from './routes/AppRouter';
import './index.css';








const queryClient = new QueryClient();

function App() {
  //     useEffect(() => {
  //   AOS.init({ duration: 1000 });
  // }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>


        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="toast-custom"
        />





        <AuthProvider>
          <RouterProvider router={appRouter} />
        </AuthProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
