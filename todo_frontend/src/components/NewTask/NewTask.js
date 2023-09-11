import React, { Component } from "react";
import style from './NewTask.module.css';
import axios from 'axios';
import { NEW_TASK_ENDPOINT } from "../Links";

class NewTask extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            completed: false,
            next: undefined
        }
        this.title_label_ref = React.createRef();
        this.description_label_ref = React.createRef();
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
        try {
            const label_classes = event.target.labels[0].className.split(' ').filter((cls) => cls !== "");
            if (label_classes.includes(style.ActiveLabel) && (this.state[event.target.name] === "")) {
                label_classes.splice(label_classes.indexOf(style.ActiveLabel));
            }
            event.target.labels[0].className = label_classes.join(' ');
        }
        catch {
            let title_label = this.title_label_ref.current;
            let description_label = this.description_label_ref.current;
            title_label.className = '';
            description_label.className = '';
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);

        try {
            const token = localStorage.getItem("access_token");
            await axios.post(NEW_TASK_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            this.setState({
                title: '',
                description: ''
            })
            this.handleInputBlur(this);
            this.props.updateParent();
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className={style.FormContainer}>
                <form method="post" className={style.NewTaskForm} onSubmit={this.handleSubmit}>
                    <div className={style.FormGroup}>
                        <div className={style.FormField}>
                            <label htmlFor="title" ref={this.title_label_ref}>title</label>
                            <input type="text" name="title" id="title" onInput={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} value={this.state.title} />
                        </div>
                        <div className={style.FormField}>
                            <label htmlFor="description" ref={this.description_label_ref}>description</label>
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
