import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebStorageService {
    hasData(dataName: string){
        return !!this.getData(dataName);
    }

    getData(dataName: string){
        let retrievedObject = JSON.parse(window.localStorage.getItem(dataName));
        if(retrievedObject){
            if(retrievedObject.time > new Date().getTime()){
                return retrievedObject.data;
            }
    
            this.removeData([dataName]);
        }
        
        return null;
        
    }

    setData(dataName: string, data: any){
        let expire = new Date().getTime() + (60000*60*3); // 1 min em ms, 1h em min, 3h
        let stringified = {
            data: data,
            time: expire
        };
        window.localStorage.setItem(dataName, JSON.stringify(stringified));
    }

    removeData(dataNames: string[]){
        dataNames.forEach(
            dataName => {
                window.localStorage.removeItem(dataName);
            }
        );
    }

    clearAll(){
        window.localStorage.clear();
    }
}