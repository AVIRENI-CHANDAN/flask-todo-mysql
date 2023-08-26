import { Component } from "react";
import style from './Home.module.css';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { USER_LOGIN } from "../Links";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect_proceed: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("access_token") !== null)
            this.setState({
                redirect_proceed: (localStorage.getItem("access_token").length >= 180) && (localStorage.getItem("access_token") !== "")
            })
        this.props.updateParent();
    }

    render() {
        return (
            (this.state.redirect_proceed === true) ? (<Navigate to={USER_LOGIN} />) : (
                <div className={style.Container} >
                    <div className={style.PageContentBox}>
                        <header className={style.Header}>
                            <h1 className={style.Title}>Todo Application</h1>
                            <p className={style.Description}>Your ultimate task manager</p>
                            <Link className={style.GetStartedButton} to={USER_LOGIN}>Get Started</Link>
                        </header>
                        <section className={style.Features}>
                            <div className={style.Feature}>
                                <h2 className={style.FeatureTitle}>Stay Organized</h2>
                                <p className={style.FeatureDescription}>Efficiently manage your tasks and stay on top of your to-do list.</p>
                            </div>
                            <div className={style.Feature}>
                                <h2 className={style.FeatureTitle}>Collaborate Seamlessly</h2>
                                <p className={style.FeatureDescription}>Work together with your team to accomplish goals.</p>
                            </div>
                            <div className={style.Feature}>
                                <h2 className={style.FeatureTitle}>Access Anywhere</h2>
                                <p className={style.FeatureDescription}>Access your tasks from any device with internet connectivity.</p>
                            </div>
                        </section>
                        <section className={style.About}>
                            <h2 className={style.SectionTitle}>About Us</h2>
                            <div className={style.SectionDescription}>
                                <p>
                                    We are passionate about helping you manage your tasks efficiently and enhance your productivity.
                                    Our mission is to provide a user-friendly and powerful task management solution.
                                </p>
                                <p>
                                    Our team of dedicated professionals is committed to creating an application that simplifies your daily life by keeping your tasks organized and easily accessible.
                                    We believe that an organized workflow leads to increased productivity and reduced stress.
                                </p>
                                <p>
                                    With a user-centered approach, we continually strive to improve the user experience and incorporate user feedback into our updates.
                                    We understand the challenges of staying on top of tasks and deadlines, and our application is designed to make your life easier.
                                </p>
                                <p>
                                    Thank you for choosing Todo Application to manage your tasks. We are excited to be a part of your journey towards increased efficiency and success.
                                </p>
                            </div>
                        </section>
                    </div>
                </div >
            )
        );
    }
}

export default Home;
