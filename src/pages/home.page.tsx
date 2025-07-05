import { type FC } from 'react';
import MatrixService from '../services/matrix.service';

const HomePage: FC = () => {

	const matrixService = MatrixService.getInstance();

	return (
		<div className="container mt-5">
			{matrixService.getString()}
		</div>
	);
};

export default HomePage;
