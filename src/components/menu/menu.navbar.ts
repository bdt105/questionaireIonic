import { ViewController, NavParams, Nav, NavController, App } from "ionic-angular";
import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { HomePage } from "@pages/home/home";
import { LoginPage } from "@pages/login/login.page";
import { TesterDefinitionPage } from "@pages/tester/testerDefinition.page";
import { QuestionnairesPage } from "@pages/questionnaire/questionnaires.page";
import { SearchPage } from "@pages/search/search.page";
import { GenericComponent } from "@sharedComponents/generic.component";
import { MenuLocalService } from "@services/menu.service";

@Component({
    selector: 'menuNavBar',
    templateUrl: "./menu.navbar.html"
})

export class MenuNavbar extends GenericComponent {

    public menus: any;
    public object: any;

    rootPage: any;

    @Input() title: string;

    public pages;
    
    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, protected app: App, public menuLocalService: MenuLocalService) {
        super(miscellaneousService);
        this.pages = this.menuLocalService.pages;
    }

    openPage(page) {
        this.app.getRootNav().setRoot(page.component);
    }
}
