import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const Admin = () => {
    const api = 'http://localhost:8000/api/activity';
    const [todoList, setTodoList] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(api);
            setTodoList(response.data);
            setUser(response.data[0].user)
            setErrorMessage(null)
        } catch (error) {
            console.error('Error fetching todos:', error);
            setErrorMessage('An error occurred while fetching todos');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [todoList])

    const groupActivitiesByUser = (activities) => {
        return activities.reduce((grouped, activity) => {
            const userId = activity.user; // Assuming you have the user ID in the 'user' field
            if (!grouped[userId]) {
                grouped[userId] = [];
            }
            grouped[userId].push(activity);
            return grouped;
        }, {});
    };

    const groupedActivities = groupActivitiesByUser(todoList || []);

    return (
        <div className="mainDiv">
            <div className="formDiv boxShadow">
                <h1>admin</h1>
                <div className="custom-scrollbar">
                    {Object.keys(groupedActivities).map((userId) => (
                        <div key={userId}>
                            <h4>User ID: {userId}</h4>
                            <div>
                                {groupedActivities[userId].map(({ _id, activity, completed }) => (
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
                                        <h3 style={{
                                            width: '60%',
                                            textDecoration: completed ?
                                                'line-through' :
                                                'none'
                                        }}>
                                            {activity}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default Admin