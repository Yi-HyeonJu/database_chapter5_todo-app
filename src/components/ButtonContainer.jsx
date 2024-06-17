import './ButtonContainer.css';

// eslint-disable-next-line react/prop-types
const ButtonContainer = ({ createTodo }) => {
	return (
		<div className="button-container">
			<button onClick={createTodo}>Todo 생성하기</button>
		</div>
	);
};

export default ButtonContainer;
