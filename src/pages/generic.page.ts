import { OnInit } from '@angular/core';

import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { Toolbox } from 'bdt105toolbox/dist';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '@pages/login/login.page';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { GenericComponent } from '@sharedComponents/generic.component';
import { HomePage } from '@pages/home/home';
import { QuestionnairesPage } from '@pages/questionnaire/questionnaires.page';

export class GenericPage extends GenericComponent {

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController,
        public connexionTokenService: ConnexionTokenService, public toastCtrl: ToastController) {
        super(miscellaneousService);
    }

    ngOnInit() {
        if (!this.isConnected()) {
            this.navController.push(LoginPage);
        }
    }

    translate(text: string) {
        return this.miscellaneousService.translate(text);
    }

    configuration() {
        return this.miscellaneousService.configuration();
    }

    isConnected() {
        let c = this.miscellaneousService.isConnected();
        return c;
    }

    getCurrentUser() {
        return this.miscellaneousService.getCurrentUser();
    }

    getApplicationName() {
        return this.miscellaneousService.getApplicationName();
    }

    toast(message: string, duration = 3000) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
}