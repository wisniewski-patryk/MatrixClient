import { type FC, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';

const useAuth = (): boolean => {
	const accessToken = localStorage.getItem('access_token');
    return !!accessToken && accessToken.length > 0;
};

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const RouterComponent: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={
				<ProtectedRoute>
					<HomePage />
				</ProtectedRoute>} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	</BrowserRouter>
);

export default RouterComponent;
