import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../src/helper-files/content-interface';
import { EntertainmentServiceService } from '../entertainment-service.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {
  id: number=0;
  contentAtSpecificId: Content | any = {};

  constructor(
    private route: ActivatedRoute, 
    private service: EntertainmentServiceService,
    private msgService: MessageService
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
      const id = this.id;
      if(id){
        this.service.getContentAtId(id).subscribe(content=>{
          this.contentAtSpecificId = content;
          this.msgService.add({status:1,msg:`Content Item at id: ${id}, title: ${content.title}`});
        })
      }
    });
  }
}
