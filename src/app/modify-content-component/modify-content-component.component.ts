import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Content } from '../../../src/helper-files/content-interface';
import { EntertainmentServiceService } from '../entertainment-service.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-modify-content-component',
  templateUrl: './modify-content-component.component.html',
  styleUrls: ['./modify-content-component.component.css']
})
export class ModifyContentComponentComponent {
  @Output() newContentEvent: any = new EventEmitter<any>();
  newContentItem:Content | any;
  formSubmitted: Boolean = false;
  formSuccess: Boolean = false;
  contentListArr: any;
  exitingContent: Content | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private entrnService: EntertainmentServiceService,
    private msgService: MessageService
  ){}
  createNewContentForm = this.formBuilder.group({
    id:[],
    title: ['', Validators.required],
    description: ['', Validators.required],
    creator: ['', Validators.required],
    type: ''
  });

  populateContent(id:any) {
    this.entrnService.getContentAtId(id.value).subscribe(content=>{
      this.exitingContent = content;
      if (content) {
        this.createNewContentForm.patchValue({
          title: content.title,
          description:  content.description,
          creator: content.creator,
          type: content.type
        });
      }
    })
  }

  emitEventAndResetForm(isEdit:Boolean,content:Content){
    this.formSuccess = true;
    this.newContentEvent.emit(content);
    this.createNewContentForm.reset();
    this.formSubmitted = false;
    this.exitingContent = null;
    this.msgService.add({status:1,msg:isEdit?'Updated Content Successfully!!':'Added Content Successfully!!'});
    setTimeout(() => {
      this.msgService.clear();
    }, 2000);
  }

  async onCreateNewContentSubmit() {
    // Following is form validation

    if (this.createNewContentForm.status.toLowerCase() === 'valid') {
      this.newContentItem = this.createNewContentForm.value;
      try {
        if (this.newContentItem.id && this.exitingContent) {
          const contentToPut = {...this.exitingContent,...this.newContentItem};
          this.entrnService.putContent(contentToPut).subscribe((content)=>{
            this.emitEventAndResetForm(true,contentToPut);
          })
        } else {
          this.entrnService.postContent(this.newContentItem).subscribe((content)=>{
            this.emitEventAndResetForm(false,content);
          })
        }
      } catch (error) {
        this.formSubmitted = true;
        this.formSuccess = false;
        this.msgService.add({status:0,msg:'There was error adding/updating Content'});
      }
    }
  }
}
