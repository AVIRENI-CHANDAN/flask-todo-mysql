import { Component } from "react";
import style from './TaskList.module.css';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        // Fetch data when the component mounts
        fetch('/task/all') // Replace with your API endpoint URL
            .then(response => response.json())
            .then(data => {
                this.setState({ data, isLoading: false });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    render() {
        const { data, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <ol className={style.TaskList}>
                {data.map((item) => (
                    <li key={item.id} className={style.Task}>
                        <p className={[style.TaskStatus, (item.completed ? style.TaskStatusDone : style.TaskStatusDue)].join(' ')}>{(item.completed) ? "completed" : "due"}</p>
                        <div className={style.TaskTitle}>{item.title}</div>
                        <div className={style.TaskDescription}>{item.description}</div>
                        <div className={style.TaskTimeLines}>
                            <div className={style.DueDate}>{item.due_date}</div>
                            <div className={style.CreateDate}>{item.created_at}</div>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default TaskList;
