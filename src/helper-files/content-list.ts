import { Content } from "./content-interface";

export class ContentList {
    private _contentsArr: Content[];
    constructor(contentArr:[]){
        this._contentsArr = contentArr;
    } 

    get contentArr():Content[] {
        return this._contentsArr;
    }

    addContentToPrivateArr(contentToAdd:Content):void{
        this._contentsArr.push(contentToAdd);
    }

    totalContents(): number{
        return this._contentsArr.length;
    }

    getContentAtSpecificIndex(indexToUse: number):Content{
        if(this._contentsArr[indexToUse]){
            return this._contentsArr[indexToUse];
        }else{
            throw new Error("Index out of array");            
        }
    }

}