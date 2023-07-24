import 'assets/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from 'layout/AuthLayout';
import ProtectedLayout from 'layout/ProtectedLayout';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes , Route } from 'react-router-dom' ;
import { ToastContainer } from 'react-toastify';
import { authRoutes, protectedRoutes } from 'routes';
import { setBreakpoint } from 'store/layout';

function App() {

  const dispatch = useDispatch()  

  useLayoutEffect(() => {
      function updateBreakpoint() {
          dispatch(setBreakpoint(window.innerWidth <= 992 ? true : false))
      }
      window.addEventListener('resize', updateBreakpoint);
      updateBreakpoint()
      return () => window.removeEventListener('resize', updateBreakpoint);
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedLayout />} exact>
          { protectedRoutes.map((route, index) => (
            <Route 
              path={route.path} 
              key={`protected-${index}`} 
              element={route.component}
            />
          ))}
          </Route>

          <Route path='/' element={<AuthLayout />} exact>
          { authRoutes.map((route, index) => (
              <Route 
                path={route.path} 
                key={`auth-${index}`} 
                element={route.component}
              />
          )) }
          </Route>
        </Routes>

        <ToastContainer style={{ fontFamily: 'DM Sans, sans-serif', width: '370px', fontSize: '13.5px'}} />
      </BrowserRouter>
    
    </>
  );
}

export default App;