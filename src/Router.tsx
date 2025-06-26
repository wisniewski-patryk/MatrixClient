import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';

const RouterComponent: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	</BrowserRouter>
);

export default RouterComponent;
