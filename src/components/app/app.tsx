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
import {
  ProtectedRoute,
  UnAuthRoute
} from '../protected-route/protected-route';

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
        {/* done */}
        <Route
          path='/register'
          element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          }
        />
        {/* done */}
        <Route
          path='/login'
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <UnAuthRoute>
              <ForgotPassword />
            </UnAuthRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UnAuthRoute>
              <ResetPassword />
            </UnAuthRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
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
