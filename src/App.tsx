import { useState } from 'react';
import './App.css';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		isLoggedIn ? (
			<HomePage />
		) : (
			<LoginPage onLogin={() => setIsLoggedIn(true)} />
		)
	);
}

export default App;
