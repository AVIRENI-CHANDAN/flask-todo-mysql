import { Component } from "react";
import style from './Dashboard.module.css';
import NewTask from "../NewTask/NewTask";
import TaskList from "../TaskList/TaskList";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false
        }
    }
    componentDidMount() {
        this.setState({
            reload: true
        })
        this.props.updateParent();
    }
    componentDidUpdate() {
        if (!this.state.reload) {
            this.setState({ reload: true });
        }
    }
    toogleRefresh = () => {
        this.setState({
            reload: !this.state.reload
        })
    }
    render() {
        return (
            <div className={style.Dashboard}>
                <div className={style.NewTaskForm}>
                    {this.state.reload && (<NewTask updateParent={this.toogleRefresh} />)}
                </div>
                <div className={style.TaskListBox}>
                    {this.state.reload && (<TaskList updateParent={this.toogleRefresh} />)}
                </div>
            </div>
        );
    }
}

export default Dashboard;
