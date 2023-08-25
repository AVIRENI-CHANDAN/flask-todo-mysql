let ENVIRONMENT_LINK = "";

(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ?
    ENVIRONMENT_LINK = "http://127.0.0.1:5000"
    :
    ENVIRONMENT_LINK = "";


export const NEW_TASK_ENDPOINT = ENVIRONMENT_LINK + '/task/new';
export const TASK_LIST_ENDPOINT = ENVIRONMENT_LINK + '/task/all';
export const USER_LOGIN = ENVIRONMENT_LINK + "/login";
