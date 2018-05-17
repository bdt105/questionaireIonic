import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '@pages/home/home';
import { ListPage } from '@pages/list/list';
import { QuestionnairesPage } from '@pages/questionnaire/questionnaires.page';
import { LoginPage } from '@pages/login/login.page';
import { TesterDefinitionPage } from '@pages/tester/testerDefinition.page';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { SearchPage } from '@pages/search/search.page';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = QuestionnairesPage;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
        public miscellaneousService: MiscellaneousService) {
        this.initializeApp();


        // used for an example of ngFor and navigation
        this.pages = [
            { title: this.translate('Home'), component: HomePage, icon: "home" },
            { title: this.translate('Login'), component: LoginPage, icon: "person" },
            { title: this.translate('Test'), component: TesterDefinitionPage, icon: "checkmark-circle" },
            { title: this.translate('Questionnaires & tests'), component: QuestionnairesPage, icon: "help" },
            { title: this.translate('Search'), component: SearchPage, icon: "search" }
        ];

    }

    translate(text: string) {
        return this.miscellaneousService.translate(text);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    isConnected() {
        return this.miscellaneousService.isConnected();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
