import { Component } from "react";
import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../Links";

class Logout extends Component {

    componentDidMount() {
        localStorage.clear();
        this.props.updateParent();
    }

    render() {
        return (<Navigate to={USER_LOGIN} />);
    }

}
export default Logout;
