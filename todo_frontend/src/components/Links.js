let ENVIRONMENT_LINK = "";

(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ?
    ENVIRONMENT_LINK = "http://127.0.0.1:5000"
    :
    ENVIRONMENT_LINK = "";

export const BASE_PATH = ENVIRONMENT_LINK + '/';
export const NEW_TASK_ENDPOINT = ENVIRONMENT_LINK + '/task/new';
export const TASK_DELETE_ENDPOINT = ENVIRONMENT_LINK + '/task/delete';
export const TASK_UPDATE_ENDPOINT = ENVIRONMENT_LINK + '/task/update';
export const TASK_LIST_ENDPOINT = ENVIRONMENT_LINK + '/task/all';
export const GET_TASK_ENDPOINT = ENVIRONMENT_LINK + '/task';
export const USER_LOGIN = ENVIRONMENT_LINK + "/login";
export const USER_LOGOUT = ENVIRONMENT_LINK + "/logout";
export const USER_HOME = ENVIRONMENT_LINK + "/home";
export const ABOUT_PATH = ENVIRONMENT_LINK + "/about";
