import { type FC } from 'react';
import LoginService from '../services/login.service';

const HomePage: FC = () => {
	const handleLogout = async () => {
		LoginService.logout().then(() => {
			console.log("Logout successful");
			// localStorage.clear();
			//window.location.href = '/login';
		}).catch(error => {
			console.error("Logout failed:", error);
		});
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8 text-center">
					<h1 className="display-4 mb-4">Welcome to MatrixClient</h1>
					<p className="lead">
						This is the home page of your React application bootstrapped with Vite and TypeScript.
					</p>
					<hr className="my-4" />
					<p>
						Explore the features and enjoy the modern UI powered by Bootstrap 5.3.
					</p>
				</div>
				<button onClick={handleLogout}>
					logout
				</button>
			</div>
		</div>
	);
};

export default HomePage;
