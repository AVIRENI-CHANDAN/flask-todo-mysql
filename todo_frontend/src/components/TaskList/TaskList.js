import { Component } from "react";
import axios from 'axios';
import style from './TaskList.module.css';
import { TASK_LIST_ENDPOINT } from "../Links";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("access_token");
        axios.get(TASK_LIST_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            this.setState({ data: response.data, isLoading: false });
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
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
                        <p className={[style.TaskStatus, (item.completed ? style.TaskStatusDone : style.TaskStatusDue)].join(' ')}>{(item.completed) ? "done" : "due"}</p>
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
