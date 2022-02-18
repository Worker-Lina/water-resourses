import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor(){
        this._users = []
        this._selectedReservoir = {}
        makeAutoObservable(this)
    }

    setUsers(users){
        this._users = users
    }

    setSelectedUser(selectedUser){
        this._selecteduser = selectedUser
    }

    get users(){
        return this._users
    }
    get user(){
        return this._selectedUser
    }

}