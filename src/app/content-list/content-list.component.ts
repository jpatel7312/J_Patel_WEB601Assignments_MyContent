import { Component } from '@angular/core';
import { Content } from '../../../src/helper-files/content-interface';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {
  contentListArr:Content[] = [];
  generateContent(id:number,contentArr:(string)[]){
    return {
      id,
      title:contentArr[0],
      description:contentArr[1],
      creator:contentArr[2]
    }
  }

  constructor(){
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
      ...{imgURL:'https://cdn.wallpapersafari.com/83/31/b59cLE.jpg'}
    });
    this.contentListArr.push({
      ...this.generateContent(
        3,['Squid Game','Players in deep financial hardship, risk their lives to play a series of deadly Game','Hwang Dong-hyuk']
      )
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
  }
}
