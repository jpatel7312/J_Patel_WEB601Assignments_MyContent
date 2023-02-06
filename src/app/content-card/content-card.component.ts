import { Component, Input } from '@angular/core';
import { Content } from '../../../src/helper-files/content-interface';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent{
  @Input() contentToDisplay:Content | any;
 
  constructor(){
   
  }

  logIdTitle(contentInfoToLog:Content):void{
    console.log(`ID: ${contentInfoToLog.id}`)
    console.log(`TITLE: ${contentInfoToLog.title}`)
  }

  //totalContents = this.initContent.contentArr
}
