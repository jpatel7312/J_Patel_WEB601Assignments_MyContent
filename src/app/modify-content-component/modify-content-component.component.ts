import { Component, EventEmitter, Output, Input, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  @Input() buttonAction: string = 'Add';
  @Input() contentToUpdate: Content | any;
  newContentItem:Content | any;
  formSubmitted: Boolean = false;
  formSuccess: Boolean = false;

  exitingContent: Content | null = null;
  constructor(
    private entrnService: EntertainmentServiceService,
    private msgService: MessageService,
    public dialog: MatDialog
  ){}

  openDialog(action: string, data: any): void {
    data.action = action;
    const dialogRef = this.dialog.open(ModifyContentComponentDialog, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(async (result) => {
        await this.onCreateNewContentSubmit(result.event,result.data);
    })
  }
  

  emitEventAndResetForm(isEdit:Boolean,content:Content){
    this.formSuccess = true;
    this.newContentEvent.emit(content);
    this.formSubmitted = false;
    this.exitingContent = null;
    this.msgService.add({status:1,msg:isEdit?'Updated Content Successfully!!':'Added Content Successfully!!'});
    setTimeout(() => {
      this.msgService.clear();
    }, 2000);
  }

  async onCreateNewContentSubmit(action:string,data:Content) {
    // Following is form validation
    this.newContentItem = data;
    try {
      if (action=='Update') {
        const contentToPut = this.newContentItem;
        this.entrnService.putContent(contentToPut).subscribe((content)=>{
          this.emitEventAndResetForm(true,contentToPut);
        })
      } else {
        // Delete id so that new id gets assigned 
        delete this.newContentItem.id;
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

@Component({
  selector: 'modify-content-component-dialog',
  templateUrl: 'modify-content-component-dialog.html',
  styleUrls: ['./modify-content-component.component.css']
})
export class ModifyContentComponentDialog {
  action:string='';
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<ModifyContentComponentDialog>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Content
  ) {
    this.local_data = {...data};
    this.action = this.local_data.action;
    dialogRef.disableClose = true;
    if(this.action == 'Update'){
        this.createNewContentForm.patchValue({
          id: data.id,
          title: data.title,
          description:  data.description,
          creator: data.creator,
          type: data.type
        });
    }
  }

  createNewContentForm = this.formBuilder.group({
    id: [{value:0,disabled:true}],
    title: ['', Validators.required],
    description: ['', Validators.required],
    creator: ['', Validators.required],
    type: ''
  });

  doAction(){
    if (this.createNewContentForm.status.toLowerCase() === 'valid') {
      this.dialogRef.close({event:this.action,data:{...this.local_data, ...this.createNewContentForm.getRawValue()}});
    }
    
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}