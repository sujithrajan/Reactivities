import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from './../models/serverError';
export default class CommonStore{
    error : ServerError | null = null;
    token : string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor(){
        makeAutoObservable(this);

        // reaction will run when token changes
        reaction(
            ()=> this.token, //this paramaeter what we want to react to - mean it will listen to changes in token value
            token =>{
                 if(token){
                     window.localStorage.setItem('jwt',token);
                 }else{
                     window.localStorage.removeItem('jwt');
                 }
            } 
        )
    }

    setServerError = (error: ServerError)=>{
        this.error = error;
    }

    
    setToken = (token:  string | null)=>{
        this.token = token;
    }

    setAppLoaded = () =>{
        this.appLoaded = true;
    }
}