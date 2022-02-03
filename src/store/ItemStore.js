import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor(){
        this._reservoirs = []
        this._selectedReservoir = {}
        makeAutoObservable(this)
    }

    setReservoirs(reservoirs){
        this._reservoirs = reservoirs
    }

    setSelectedReservoir(selectedReservior){
        this._selectedReservoir = selectedReservior
    }

    get reservoirs(){
        return this._reservoirs
    }
    get reservoir(){
        return this._selectedReservoir
    }

}