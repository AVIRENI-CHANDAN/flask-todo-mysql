import { Component } from "react";
import axios from 'axios';
import style from './TaskUpdate.module.css';
import { GET_TASK_ENDPOINT, TASK_UPDATE_ENDPOINT } from "../Links";

class TaskUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            description: undefined,
            due_date: undefined,
            completed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(event) {
        const field_name = event.target.name;
        if (field_name === "title" || field_name === "description" || field_name === "due_date")
            this.setState({ [event.target.name]: event.target.value });
        if (field_name === "completed")
            this.setState((prevState) => ({ completed: !prevState.completed }));
    }

    async componentDidMount() {
        const task_id = parseInt(this.props.task_id);
        const token = localStorage.getItem("access_token");

        const formData = new FormData();
        formData.append('task_id', task_id);
        try {
            const response = await axios.post(GET_TASK_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.setState({
                title: response.data.title,
                description: response.data.description,
                due_date: (new Date(response.data.due_date)).toISOString().slice(0, 16),
                completed: response.data.completed
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const form_data = new FormData();
        form_data.append('task_id', this.props.task_id);
        form_data.append('title', this.state.title);
        form_data.append('description', this.state.description);
        form_data.append('due_date', this.state.due_date);
        form_data.append('completed', this.state.completed);

        const token = localStorage.getItem("access_token");
        const response = await axios.post(TASK_UPDATE_ENDPOINT, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        });
        this.props.updateParent();
    }

    render() {
        return (
            <div className={style.Task_Update_Form_Box}>
                <form className={style.Task_Update_Form} onSubmit={this.handleFormSubmit}>
                    <div className={style.Form_Group}>
                        <div className={style.Form_Field}>
                            <input type="text" value={this.state.title} name="title" className={style.Form_Field_Input} onInput={this.handleInputChange} />
                            <label htmlFor="title">title</label>
                        </div>
                    </div>
                    <div className={style.Form_Group}>
                        <div className={style.Form_Field}>
                            <textarea rows={2} name="description" value={this.state.description} className={style.Form_Field_Input} onInput={this.handleInputChange} />
                            <label htmlFor="description">description</label>
                        </div>
                    </div>
                    <div className={style.Form_Group}>
                        <div className={style.Form_Field}>
                            <input type="datetime-local" value={this.state.due_date} name="due_date" className={style.Form_Field_Input} onInput={this.handleInputChange} />
                            <label htmlFor="due_date">due date</label>
                        </div>
                        <div className={style.Form_Field}>
                            <input type="checkbox" name="completed" checked={this.state.completed} className={style.Form_Field_Input} onInput={this.handleInputChange} />
                            <label htmlFor="completed">completed</label>
                        </div>
                    </div>
                    <button type="submit" className={[style.Update_Btn, style.Action_Btn].join(' ')}>Update</button>
                </form>
            </div>
        );
    }
}

export default TaskUpdate;
