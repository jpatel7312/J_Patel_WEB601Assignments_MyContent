import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../src/helper-files/content-interface';
import { EntertainmentServiceService } from '../entertainment-service.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent {
  @Input() newContentEvent: any;
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
    this.entrnService.sharedContent.push(event);
    this.entrnService.sharedContent = [...this.entrnService.sharedContent];
  }

  constructor(
    private formBuilder: FormBuilder,
    public entrnService: EntertainmentServiceService,
    private msgService: MessageService
  ){

  }

  ngOnInit() {
    this.entrnService.getContent().subscribe((content)=>{
      this.entrnService.sharedContent = content;
      this.msgService.add({status:1,msg:'Content array loaded!'});
      //this.onSubmit(4);
      setTimeout(() => {
        this.msgService.clear();
      }, 2000);
    })
  }
}
