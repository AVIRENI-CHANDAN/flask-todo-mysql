import { Component } from "react";
import style from './Dashboard.module.css';
import NewTask from "../NewTask/NewTask";
import TaskList from "../TaskList/TaskList";

class Dashboard extends Component {
    render() {
        return (
            <div className={style.Dashboard}>
                <div className={style.NewTaskForm}>
                    <NewTask />
                </div>
                <div className={style.TaskListBox}>
                    <TaskList />
                </div>
            </div>
        );
    }
}

export default Dashboard;
