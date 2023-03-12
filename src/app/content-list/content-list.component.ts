import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Content } from '../../../src/helper-files/content-interface';
import { EntertainmentServiceService } from '../entertainment-service.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {
  contentListArr:Content[] = [];
  retrievedContent:Content|any;
  displayMsgCode:number=-2;

  userTitleInputForm = this.formBuilder.group({
    contentTitleField: 0
  });

  onSubmit=(id?:number)=>{
    this.entrnService.getContentAtId(id?id:this.userTitleInputForm.controls.contentTitleField.value).subscribe((content)=>{
      this.msgService.clear();
      if (content) {
        this.retrievedContent={...content};
        this.retrievedContent.highlight = true;
        this.msgService.add({status:1,msg:`Content Item at id: ${id?id:this.userTitleInputForm.controls.contentTitleField.value}`});
      } else{
        this.retrievedContent='';
        this.msgService.add({status:0,msg:'There was an error getting content!!'});
      }

    })

  }

  addNewContentToList(event:Content){
    const contentIndxToUpdate = this.contentListArr.findIndex(content=>content.id==event.id);
    contentIndxToUpdate > -1 ? this.contentListArr[contentIndxToUpdate] = event : this.contentListArr.push(event);
    this.contentListArr = [...this.contentListArr];
  }

  constructor(
    private formBuilder: FormBuilder,
    private entrnService: EntertainmentServiceService,
    private msgService: MessageService
  ){

  }

  ngOnInit() {
    this.entrnService.getContent().subscribe((content)=>{
      this.contentListArr = content;
      this.msgService.add({status:1,msg:'Content array loaded!'});
      this.onSubmit(4);
      setTimeout(() => {
        this.msgService.clear();
      }, 2000);
    })
  }
}
