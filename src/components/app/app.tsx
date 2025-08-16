// src\components\app\app.tsx

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* done */}
        <Route path='/' element={<ConstructorPage />} />
        {/* done */}
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyUnAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Модальные маршруты */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
