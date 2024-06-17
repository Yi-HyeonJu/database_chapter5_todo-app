import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import ButtonContainer from './ButtonContainer';
import './TodoContainer.css';

function TodoContainer({ theme, toggleTheme }) {
	const [todos, setTodos] = useState([]);
	const [editingTodo, setEditingTodo] = useState(null);
	const [newTitle, setNewTitle] = useState('');

	// 데이터베이스의 데이터 렌더링
	useEffect(() => {
		// 데이터베이스의 Todos 가져오기(get)
		// 데이터를 가져오는 함수 fetchTodos
		const fetchTodos = async () => {
			try {
				// 데이터를 성공적으로 가져오면 setTodos를 호출하여 상태를 업데이트합니다
				const response = await axios.get('http://localhost:8080/api/todos');
				setTodos(response.data);

				// 데이터를 가져오는 동안 또는 실패 시 오류를 콘솔에 기록
			} catch (error) {
				console.error('Error fetching todos:', error.message);
			}
		};

		fetchTodos();
	}, []);

	// 데이터베이스에 Todos 보내기(post)
	// 데이터를 새로 만들고 기존 데이터를 불러오는 함수 createTodo
	const createTodo = async () => {
		try {
			// 요청 본문에 담을 새로운 TodoItem의 제목과 초기 완료 상태 newTodo
			const newTodo = {
				title: '새 할 일',
				completed: false,
			};
			// axios를 사용하여 서버의 /api/todos 엔드포인트에 POST 요청
			// + 초기 상태 newTodo를 함께 보냠
			await axios.post('http://localhost:8080/api/todos', newTodo);

			// 새로운 TodoItem이 성공적으로 생성되면 서버에서 모든 TodoItem을 다시 가져와 상태 업데이트
			const response = await axios.get('http://localhost:8080/api/todos');
			setTodos(response.data);

			// 요청 중 오류가 발생하면 이를 콘솔에 기록
		} catch (error) {
			console.error('Error creating todo:', error);
		}
	};

	return (
		<div className="todo-app-container">
			<ButtonContainer createTodo={createTodo} />
			<div className="todo-list">
				{todos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						setTodos={setTodos}
						editingTodo={editingTodo}
						setEditingTodo={setEditingTodo}
						newTitle={newTitle}
						setNewTitle={setNewTitle}
					/>
				))}
			</div>
		</div>
	);
}

export default TodoContainer;
