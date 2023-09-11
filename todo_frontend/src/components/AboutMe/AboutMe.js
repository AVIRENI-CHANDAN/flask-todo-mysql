import { Component } from 'react';
import styles from './AboutMe.module.css';
import axios from 'axios';
import { ABOUT_PATH } from '../Links';

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutMeInfo: {},
            isLoading: true,
            error: null,
        };
    }

    async componentDidMount() {
        // Fetch information about you from the Flask endpoint using Axios
        await axios.post(ABOUT_PATH)
            .then((response) => {
                this.setState({
                    aboutMeInfo: response.data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoading: false,
                });
            });
    }

    render() {
        const { aboutMeInfo, isLoading, error } = this.state;

        return (
            <div style={styles.aboutMeContainer}>
                <h2 style={styles.aboutMeHeading}>About Me</h2>
                {isLoading && <div style={styles.loadingText}>Loading...</div>}
                {error && <div style={styles.errorText}>Error: {error.message}</div>}
                {!isLoading && !error && (
                    <div style={styles.aboutMeContent}>
                        <p>
                            <strong style={styles.infoLabel}>Name:</strong> {aboutMeInfo.name}
                        </p>
                        <p>
                            <strong style={styles.infoLabel}>Bio:</strong> {aboutMeInfo.bio}
                        </p>
                        <p>
                            <strong style={styles.infoLabel}>Email:</strong>{' '}
                            <a href={`mailto:${aboutMeInfo.email}`} style={styles.infoLink}>
                                {aboutMeInfo.email}
                            </a>
                        </p>
                        {aboutMeInfo.website &&
                            <p>
                                <strong style={styles.infoLabel}>Website:</strong>{' '}
                                <a
                                    href={aboutMeInfo.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.infoLink}
                                >
                                    {aboutMeInfo.website}
                                </a>
                            </p>
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default AboutMe;
