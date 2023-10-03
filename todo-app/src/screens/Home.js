import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
const Home = () => {
    const api = 'http://localhost:8000/api/activity';
    const location = useLocation().state;
    const [todoList, setTodoList] = useState(null);
    const [todo, setTodo] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isCompleted, setCompleted] = useState(false);

    const [update, setUpdate] = useState({
        id: '',
        status: false
    });

    const [loading, setLoading] = useState(true);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${api}/${location.userId}`);
            setTodoList(response.data);
            setLoading(false);
            setErrorMessage(null);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setErrorMessage('An error occurred while fetching todos');
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTodos();
    }, [todoList])

    const handleAddActivity = async (event) => {
        event.preventDefault();
        const todoData = {
            activity: todo,
            completed: isCompleted,
            user: location.userId
        }
        if (todo === '') {
            setErrorMessage('Fill the todo!')
        } else {
            try {
                const response = await axios.post('http://localhost:8000/api/activity', todoData);
                if (response.status === 200) {
                    setTodo('')
                    fetchTodos()
                }
            } catch (error) {
                console.error(error);
                setErrorMessage(error.messgae)
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/activity/${id}`);
            // Check the response status to handle success/failure
            if (response.status === 200) {
                console.log('Successfully deleted:', id);
                // Refetch the data after successful delete
                fetchTodos();
            } else {
                console.log('Deletion failed:', response.data);
                setErrorMessage('Deletion failed');
            }
        } catch (error) {
            console.error('Error deleting:', error);
            setErrorMessage('An error occurred while deleting');
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const todoData = {
            activity: todo,
            isCompleted
        }
        if (todo === '') {
            setErrorMessage('Fill the todo!')
        } else {
            try {
                const response = await axios.put(`http://localhost:8000/api/activity/${update.id}`, todoData);

                fetchTodos();
                setErrorMessage('');
                setTodo('')
                setUpdate({
                    id: '',
                    status: false
                })
            } catch (error) {
                console.error(error);
                setErrorMessage(error.message || 'An error occurred');
            }
        }
    }
    const handleCheckboxChange = async (event, { _id, activity }) => {
        const isChecked = event.target.checked;
        const todoData = {
            activity,
            completed: isChecked
        };
        try {
            const response = await axios.put(`http://localhost:8000/api/activity/${_id}`, todoData);

            fetchTodos();
            setErrorMessage('');
            setTodo('');
            setUpdate({
                id: '',
                status: false
            });
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    return (
        <>
            <div className="mainDiv">
                <div className="formDiv boxShadow">
                    <div>
                        <h2 style={{ color: '#10273d' }}>
                            Welcome <span>
                                {location.user}
                            </span>
                        </h2>
                    </div>
                    <div>
                        <form style={{ display: 'flex' }}
                            onSubmit={!update.status ? handleAddActivity : handleUpdate} >
                            <button type="submit" className="inputBtn">
                                {
                                    !update.status ?
                                        <FaPlus />
                                        :
                                        <FaPen />
                                }
                            </button>
                            <input
                                placeholder="add todo"
                                type="text"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                className="formInput"
                            />
                        </form>
                    </div>
                    <div>
                        {loading ? (
                            <div className="loadingDiv">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only"></span>
                                </Spinner>
                            </div>
                        ) : todoList && todoList.length > 0 ? (
                            todoList.map(({ _id, activity, completed }) => (
                                <div
                                    key={_id}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        marginBottom: '1rem'
                                    }}
                                    className="boxShadow"
                                >
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        checked={completed}
                                        onChange={(event) => handleCheckboxChange(event, { _id, activity })} />
                                    <h3
                                        style={{
                                            width: '60%',
                                            textDecoration: completed ? 'line-through' : 'none'
                                        }}
                                    >
                                        {activity}
                                    </h3>
                                    <button
                                        style={{
                                            width: '70px',
                                            border: 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                        onClick={() => handleDelete(_id)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        style={{
                                            width: '70px',
                                            border: 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                        onClick={() => setUpdate({ id: _id, status: true })}
                                    >
                                        <FaPen />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="errorDiv">
                                <h4>No tasks found</h4>
                            </div>
                        )}

                        {
                            errorMessage &&
                            <div className="errorDiv">
                                <h4 className="errorText">
                                    {errorMessage}
                                </h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

