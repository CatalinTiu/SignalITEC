import { Component,ViewChild, } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, openTab? : any}>;
  rootPage = 'SidemenuPage';
  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Profile', component: 'DashboardTabsPage' },
      { title: 'My Issues', component: 'ListsTabsPage' },
      { title: 'Stats', component: 'DashboardTabsPage', openTab: 1 },
      { title: 'Issues List', component: 'NoTabsPage' },
    ];
  }

}
