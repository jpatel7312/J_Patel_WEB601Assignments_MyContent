import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './content-list/content-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/content",
    pathMatch: "full",
  },
  {
    path: "list",
    redirectTo: "/content",
    pathMatch: "full",
  },
  { path: "content", component: ContentListComponent },
  { path: "content/:id", loadChildren: () => import('./content-details/content-details.module').then(m => m.ContentDetailsModule) },
  { path: "**", component: PageNotFoundComponent }
    
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
