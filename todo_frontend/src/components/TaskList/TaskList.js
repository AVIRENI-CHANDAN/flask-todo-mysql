import { Component } from "react";
import axios from 'axios';
import style from './TaskList.module.css';
import { Navigate } from 'react-router-dom';
import { TASK_DELETE_ENDPOINT, TASK_LIST_ENDPOINT, USER_LOGIN } from "../Links";
import { UpdateIcon, DeleteIcon } from "../SVGIcons/SVGIcons";
import TaskUpdate from "../TaskUpdate/TaskUpdate";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            next: undefined,
            update: -1
        };
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
        this.handleTaskUpdateCancel = this.handleTaskUpdateCancel.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("access_token");
        axios.get(TASK_LIST_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            this.setState({ data: response.data, isLoading: false });
        }).catch(error => {
            console.error('Error fetching data:', error);
            this.setState({ next: USER_LOGIN });
        });

        console.log("TaskList component loaded:", this.state);
    }

    async handleTaskDelete(event) {
        const task_id = event.target.dataset.key;
        const token = localStorage.getItem("access_token");

        const formData = new FormData();
        formData.append('task_id', task_id);
        await axios.post(TASK_DELETE_ENDPOINT, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.info(response);
        }).catch(error => {
            console.error('Error deleting the task:', task_id, error);
        });
        this.props.updateParent();
    }

    handleTaskUpdate(event) {
        console.log("Update dataset:", event.target.dataset);
        const task_id = parseInt(event.target.dataset.key);
        this.setState({ update: task_id });
    }
    handleTaskUpdateCancel(event) {
        this.setState({ update: -1 });
    }

    componentDidUpdate() {
        console.log('TaskList updated', this.state);
    }

    render() {
        const { data, isLoading, next } = this.state;

        if (next)
            return <Navigate to={USER_LOGIN} />;

        if (isLoading)
            return <p>Loading...</p>;

        return <ol className={style.TaskList}>
            {data.map((item) => (
                <li key={item.id} className={style.Task}>
                    <div className={style.Task_Status_Title_Container}>
                        <div className={style.TaskTitle}>{item.title}</div>
                        <div className={[style.TaskStatus, (item.completed ? style.TaskStatusDone : style.TaskStatusDue)].join(' ')}>{(item.completed) ? "done" : "due"}</div>
                    </div>
                    <div className={style.TaskDescription}>{item.description}</div>

                    {!item.completed && (<div className={style.TaskTimeLines}>
                        <div className={style.DueDate}>{item.due_date}</div>
                        <div className={style.CreateDate}>{item.created_at}</div>
                    </div>)}

                    <div className={style.Task_Action_Button_Container}>
                        <div className={[
                            style.Task_Update_Container,
                            (this.state.update !== item.id) && style.Inactive_Task_Update_Container
                        ].join(' ')}>
                            <div className={style.Task_Update_Wrapper}>
                                <div className={style.Task_Update_Cancel_Wrapper} onClick={this.handleTaskUpdateCancel}></div>
                                <TaskUpdate updateParent={this.props.updateParent} task_id={(parseInt(item.id))} onClick={null} />
                            </div>
                        </div>

                        <div className={[style.Action_Update, style.Task_Action_Button].join(' ')} onClick={this.handleTaskUpdate} data-key={parseInt(item.id)}><UpdateIcon /></div>
                        <div className={[style.Action_Delete, style.Task_Action_Button].join(' ')} onClick={this.handleTaskDelete} data-key={parseInt(item.id)}><DeleteIcon /></div>
                    </div>
                </li>

            ))}
        </ol>;
    }
}

export default TaskList;
