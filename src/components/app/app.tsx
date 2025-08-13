// src\components\app\app.tsx

import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

// тест !!!
// import { IngredientsTest } from '../../_temp/IngredientsTest';

const App = () => {
  return (  
    <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/feed" element={<Feed />} />

          <Route path="/login"            element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
          <Route path="/register"         element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
          <Route path="/forgot-password"  element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
          <Route path="/reset-password"   element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
          <Route path="/profile"          element={<ProtectedRoute onlyUnAuth><Profile /></ProtectedRoute>} />
          <Route path="/profile/orders"   element={<ProtectedRoute onlyUnAuth><ProfileOrders /></ProtectedRoute>} />

          {/* Модальные маршруты */}
          <Route path="/feed/:number" 
            element={
              <Modal 
                title={''} 
                onClose={function (): void {throw new Error('Function not implemented.');} }>
                <OrderInfo />
              </Modal>
            } 
          />

          <Route path="/ingredients/:id"
            element={
              <Modal
                title={''} 
                onClose={function (): void {throw new Error('Function not implemented.');} }>
                <IngredientDetails />
              </Modal>
            } 
          />

          <Route path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal
                  title={''}
                  onClose={function (): void {throw new Error('Function not implemented.');} }>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            } 
          />

          {/* Временный тестовый маршрут */}
          {/* <Route path="/temp" element={<IngredientsTest />} /> */}
          
          <Route path="*" element={<NotFound404 />} />
        </Routes>
    </div>
  );
};

export default App;
