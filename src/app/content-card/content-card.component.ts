import { Component, OnInit } from '@angular/core';
import { ContentList } from 'src/helper-files/content-list';
import { Content } from 'src/helper-files/content-interface';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent{
  initContent= new ContentList([]);
  contentIndex:number = 0; 
  fetchedContent:Content | undefined;
  errorMessage:string=``;
  generateContent(id:number,contentArr:(string)[]){
    return {
      id,
      title:contentArr[0],
      description:contentArr[1],
      creator:contentArr[2]
    }
  }
 
  constructor(){
    this.initContent.addContentToPrivateArr({
        ...this.generateContent(
          1,['Avatar','Most popular aminated movie of all time','James Cameron']
        ),
        ...{imgURL:'../assets/avatar.jpg'},
        ...{type:'Movie'},
        ...{tags:['Animated','Most Popular','Creative']}
      });
    this.initContent.addContentToPrivateArr({
      ...this.generateContent(
        2,['Friends',`Friends is a 90's Comedy TV show`,'David Crane and Marta Kauffman']
      ),
      ...{imgURL:'https://cdn.wallpapersafari.com/83/31/b59cLE.jpg'}
    });
    this.initContent.addContentToPrivateArr({
      ...this.generateContent(
        3,['Squid Game','Players in deep financial hardship, risk their lives to play a series of deadly Game','Hwang Dong-hyuk']
      )
    });
  }

  onSubmit():void{
    try{
      this.fetchedContent = this.initContent.getContentAtSpecificIndex(this.contentIndex);
      this.errorMessage='';
    }catch{
      this.errorMessage=`Entered Array index is out of bound please enter value between 0 and ${this.initContent.contentArr.length-1} (inclusive)`;
    }
  }

  //totalContents = this.initContent.contentArr
}
