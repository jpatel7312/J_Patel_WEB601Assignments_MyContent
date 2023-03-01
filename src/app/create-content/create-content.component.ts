import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Content } from 'src/helper-files/content-interface';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent {
  @Output() newContentEvent: any = new EventEmitter<any>();
  newContentItem:Content | any;
  formSubmitted: Boolean = false;
  formSuccess: Boolean = false;
  constructor(private formBuilder: FormBuilder){}
  createNewContentForm = this.formBuilder.group({
    id:[0, Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    creator: ['', Validators.required],
    type: ''
  });

  // Instance Validation
  isInstanceOfContent(contentToCheck:any):boolean{
    return 'id' in contentToCheck && 'title' in contentToCheck && 'description' in contentToCheck && 'creator' in contentToCheck;
  }
  promise = () => {
    let isTestPassed = this.isInstanceOfContent(this.newContentItem);
    return isTestPassed?Promise.resolve('success'):Promise.reject('failed');
  };
  async onCreateNewContentSubmit() {
    // Following is form validation
    if (this.createNewContentForm.status.toLowerCase() === 'valid') {
      this.newContentItem = this.createNewContentForm.value;
      this.formSubmitted = true;
      try {
        await this.promise();
        this.newContentEvent.emit(this.newContentItem);
        this.createNewContentForm.reset();
        this.formSubmitted = false;
      } catch (error) {
        this.formSuccess = false;
      }
    }
  }
}
