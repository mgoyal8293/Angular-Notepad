export interface HttpRequestFormat {
    userId : number,
    password : string,
    notes : JSON,
    userName : string
}
export const CONSTANTS = {
    homePageRoute: 'home',
    urlParam: 'id',
    objectId: 'objectId',
    userId: 'userId',
    notes: 'notes',
    password: 'password',
    userName: 'userName',
    loginPageRoute: 'login',
    userNameEmpty: 'Enter Username please',
    passwordEmpty: 'Enter Password please',
    url : 'https://notepad-89da.restdb.io/rest/userdata',
    headers : {
      'content-type' : 'application/json',
      'x-apikey' : '63ce8e71969f06502871b131',
      'cache-control' : 'no-cache'
    }
};