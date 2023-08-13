import { Component } from "react";
import style from './NotFound.module.css';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCode: this.props.errorCode || 404
        }
    }

    render() {
        return (
            <div className={style.NotFoundPageContainer}>
                <div className={style.ErrorCodeWaterMark}>{this.state.errorCode}</div>
                <div className={style.NotFoundErrorBox}>
                    Page you have requested is not found
                </div>
            </div>
        );
    }
}
export default NotFound;
