import { Component, OnInit } from '@angular/core';
import { LogUpdateService } from './log-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'J_Patel_MyContent_SPA';

  constructor(private logService: LogUpdateService) { }
    ngOnInit(): void {
      this.logService.init();
    }
}
