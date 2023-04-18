import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {

  constructor(
    private updates: SwUpdate, 
    private appRef: ApplicationRef,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  confirmWithUserToReloadPage() {
    //Display snack bar button
    console.log("check with user if they want to reload the page");
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snack-bar'];
    this.zone.run(() => {
      const snackBarRef = this.snackBar.open("Update available reload the page!!", 'Reload', config);
      snackBarRef.onAction().subscribe(() => {
        this.updates.activateUpdate().then(() =>
          document.location.reload()
        );
      })
    });
  }

  public init(){
    // Only if service workers is enabled
    //if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe((event)=>{
        console.log(event.type);
        
        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${event.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${event.currentVersion.hash}`);
            console.log(`New app version ready for use: ${event.latestVersion.hash}`);
            this.confirmWithUserToReloadPage();
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${event.version.hash}': ${event.error}`);
            break;
        }
        
      })
    //}
    this.appRef.isStable.subscribe(()=>{
      let intervalMinutes = 30;
      interval(intervalMinutes * 60 * 1000).subscribe(() => {
        this.updates.checkForUpdate()
        .then((event) => {
          console.log('Is there update?',event)
          if (event) {
            this.confirmWithUserToReloadPage();
          }else {
            console.log('No updates available !!!!')
          }
        })
      });
    })
  }
}
