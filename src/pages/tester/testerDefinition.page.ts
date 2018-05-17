import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ViewController, NavParams, Slides, AlertController, ToastController } from 'ionic-angular';
import { GenericPage } from '../generic.page';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { MenuPopover } from '../../components/popover/menu.popover';
import { QuestionnairesLocalComponent } from '../../components/questionnaire/questionnairesLocal.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { QuestionnairesComponent } from '@appSharedComponents/questionnaires.component';
import { TesterPage } from '@pages/tester/tester.page';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';

@Component({
    selector: 'testerDefinition-page',
    templateUrl: 'testerDefinition.page.html'
})

export class TesterDefinitionPage extends GenericPage {

    public testOptions: any = {};

    @ViewChild('definition') slides: Slides;
    @ViewChild('questionnaires') questionnairesComponent: QuestionnairesComponent;

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, 
        private alertController: AlertController, public navParams: NavParams, public questionnaireService: QuestionnaireService,
        private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService, toastController: ToastController) {
        super(miscellaneousService, navController, connexionTokenService, toastController);
    }


    start() {
        let q = this.questionnairesComponent.questionnaires;
        let nb = 0;
        for (var i = 0; i < q.length; i++) {
            if (q[i].test) {
                nb++;
            }
        }
        if (nb == 0){
            let alert = this.alertController.create({
                title: this.translate('Start your test'),
                subTitle: this.translate('Please select at least one questionnaire'),
                buttons: [{
                    text: this.translate('OK'),
                    handler: () => {
                        this.slides.slideTo(0);
                    }
                }]
            });
            alert.present();         
        }else{
            this.navController.push(TesterPage, 
                {
                    "testOptions": this.testOptions,
                    "questionnaires": q
                }
            );
        }
    }

    nextSlide() {
        this.slides.slideNext();
    }
    previousSlide() {
        this.slides.slidePrev();
    }

    slideChanged() {
    }
}
