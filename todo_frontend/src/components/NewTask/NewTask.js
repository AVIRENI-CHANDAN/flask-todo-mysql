import { Component } from "react";
import style from './NewTask.module.css';
import axios from 'axios';
import { NEW_TASK_ENDPOINT } from "../Links";

class NewTask extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            completed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleInputFocus(event) {
        const label_classes = event.target.labels[0].className.split(' ').filter((cls) => cls !== "");
        if (!label_classes.includes(style.ActiveLabel)) {
            label_classes.push(style.ActiveLabel);
        }
        event.target.labels[0].className = label_classes.join(' ');
    }

    handleInputBlur(event) {
        const label_classes = event.target.labels[0].className.split(' ').filter((cls) => cls !== "");
        if (label_classes.includes(style.ActiveLabel) && (this.state[event.target.name] === "")) {
            label_classes.splice(label_classes.indexOf(style.ActiveLabel));
        }
        event.target.labels[0].className = label_classes.join(' ');
    }

    async handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);

        try {
            const response = await axios.post(NEW_TASK_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <div className={style.FormContainer}>
                <form method="post" className={style.NewTaskForm} onSubmit={this.handleSubmit}>
                    <div className={style.FormGroup}>
                        <div className={style.FormField}>
                            <label htmlFor="title">title</label>
                            <input type="text" name="title" id="title" onInput={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} value={this.state.title} />
                        </div>
                        <div className={style.FormField}>
                            <label htmlFor="description">description</label>
                            <input type="text" name="description" id="description" onInput={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} value={this.state.description} />
                        </div>
                    </div>
                    <div className={style.FormField}>
                        <button type="submit" className={style.Btn}>Add Task</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default NewTask;
