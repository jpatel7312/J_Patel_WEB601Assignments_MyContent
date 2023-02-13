import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Content } from '../../../src/helper-files/content-interface';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {
  contentListArr:Content[] = [];
  displayMsgCode:number=-2;
  generateContent(id:number,contentArr:(string)[]){
    return {
      id,
      title:contentArr[0],
      description:contentArr[1],
      creator:contentArr[2]
    }
  }

  userTitleInputForm = this.formBuilder.group({
    contentTitleField: ''
  });

  onSubmit=()=>{
    if (!this.userTitleInputForm.controls.contentTitleField.value) {
      return;
    }
    this.displayMsgCode = this.contentListArr.findIndex(content=>content.title.toLowerCase()===this.userTitleInputForm.controls.contentTitleField.value?.toLowerCase());
    if(this.displayMsgCode>-1){
      this.contentListArr[this.displayMsgCode].highlight = true;   
      this.scroller.scrollToAnchor(this.contentListArr[this.displayMsgCode].title);   
    }
    setTimeout(() => {
      this.contentListArr[this.displayMsgCode].highlight = false;
      this.displayMsgCode = -2;
    }, 5000);
  }

  constructor(private formBuilder: FormBuilder, private scroller: ViewportScroller){
    this.contentListArr.push({
      ...this.generateContent(
        1,['Avatar','Most popular aminated movie of all time','James Cameron']
      ),
      ...{imgURL:'../assets/avatar.jpg'},
      ...{type:'Movie'},
      ...{tags:['Animated','Most Popular','Creative']}
    });
    this.contentListArr.push({
      ...this.generateContent(
        2,['Friends',`Friends is a 90's Comedy TV show`,'David Crane and Marta Kauffman']
      ),
      ...{type:'Sitcom'},
      ...{imgURL:'https://cdn.wallpapersafari.com/83/31/b59cLE.jpg'}
    });
    this.contentListArr.push({
      ...this.generateContent(
        3,['Squid Game','Players in deep financial hardship, risk their lives to play a series of deadly Game','Hwang Dong-hyuk']
      ),
      ...{type:'Web-Series'}
    });
    this.contentListArr.push({
      ...this.generateContent(
        4,['3 Idiots',' Indian Hindi-language coming-of-age comedy-drama film written, edited and directed by Rajkumar Hirani','Rajkumar Hirani']
      ),
      ...{type:'Movie'},
      ...{imgURL:'https://i.zoomtventertainment.com/story/Untitled_design_-_2020-05-01T135137.466.jpg'},
      ...{tags:['Bollywood','Most Popular Hindispeaking Movie','Comedy','Based on book']}
    });
    this.contentListArr.push({
      ...this.generateContent(
        5,['A Beautiful Mind','A Beautiful Mind is a 2001 American biographical drama film directed by Ron Howard','Akiva Goldsman']
      )
    });
    this.contentListArr.push({
      ...this.generateContent(
        6,['The Recruit','The Recruit is a 2003 American spy thriller film','Roger Donaldson']
      )
    });
    this.contentListArr.push({
      ...this.generateContent(
        7,['The Shawshank Redemption','It is a 1994 American drama film','Frank Darabont']
      )
    });
    this.contentListArr.push({
      ...this.generateContent(
        8,['The God Father','The Godfather is a 1972 American crime film','Francis Ford Coppola']
      )
    });
  }
}
