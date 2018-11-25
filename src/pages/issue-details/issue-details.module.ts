import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueDetailsPage } from './issue-details';

@NgModule({
  declarations: [
    IssueDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueDetailsPage),
  ],
})
export class IssueDetailsPageModule {}
