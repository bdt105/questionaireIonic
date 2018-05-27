import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ViewController, NavParams, Slides, AlertController, ToastController } from 'ionic-angular';
import { GenericPage } from '../generic.page';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { MenuPopover } from '../../components/popover/menu.popover';
import { QuestionnairesLocalComponent } from '../../components/questionnaire/questionnairesLocal.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { QuestionnairesComponent } from '@appSharedComponents/questionnaires.component';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';

@Component({
    selector: 'tester-page',
    templateUrl: 'tester.page.html'
})

export class TesterPage extends GenericPage {

    public score: any;
    public firstLoad: any = true;
    public testOptions: any = {};
    public questionnaires: any = {};
    public resume: boolean = false;
    public test: any;
    public pourcentage = 0;

    public numbers = [0, 1, 2];
    public tempSlides: any = [];

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController,
        private alertController: AlertController, public navParams: NavParams,
        private questionnaireService: QuestionnaireService,
        private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService, toastController: ToastController) {
        super(miscellaneousService, navController, connexionTokenService, toastController);
    }

    ngOnInit() {
        super.ngOnInit();
        this.test = this.navParams.get("testToResume");
        if (!this.test) {
            this.testOptions = this.navParams.get("testOptions");
            this.questionnaires = this.navParams.get("questionnaires");
            this.test = this.questionnaireService.newQuestionnaire("test");
            this.test.questions = this.questionnaireService.generateQuestions(
                this.questionnaires, this.testOptions.randomQuestions, this.testOptions.jeopardy,
                this.testOptions.nbQuestions, this.testOptions.favoriteOnly);
            this.test.indexCurrentQuestion = 0;
        }
    }

    updatePourcentage() {
        this.test.pourcentage = Math.round(this.test.indexCurrentQuestion / (this.test.questions.length - 1) * 100);
    }

    next() {
        let q = this.test.questions[this.test.indexCurrentQuestion];
        this.checkQuestion(q);
        if (q.checked && (q.status || q.acknowleged)) {
            this.test.indexCurrentQuestion++;
            this.updatePourcentage();
        }
        q.acknowleged = true;
        if (!q.status) {
            q.showAnswers = true;
        }
    }

    previous() {
        this.test.indexCurrentQuestion--;
        this.updatePourcentage();
    }


    dateStringDbToDate(date: string) {
        if (date) {
            let d1 = new Date(parseInt(date.substr(0, 4)),
                parseInt(date.substr(5, 2)) - 1, parseInt(date.substr(8, 2)), parseInt(date.substr(11, 2)),
                parseInt(date.substr(14, 2)), parseInt(date.substr(17, 2)));
            return d1;
        } else {
            return null;
        }
    }

    checkQuestion(question: any) {
        this.questionnaireService.checkQuestion(question, question.customAnswer, false);
        this.test.score = this.questionnaireService.getScore(this.test.questions);
        this.toolbox.dateDbToStringFr
        let d1 = this.dateStringDbToDate(this.test.modificationDate).getTime();
        let d2 = this.dateStringDbToDate(this.test.creationDate).getTime();
        let diff = d1 - d2;
        this.test.duration = { "milliseconds": diff, "hour": Math.trunc(diff / 1000 / 60 / 24), "minutes": Math.trunc(diff / 1000 / 60), "seconds": Math.trunc(diff / 1000) };
    }

    private successSave(data: any) {
        this.toast(this.translate("Test saved!"));
    }

    private failureSave(error: any) {
        this.toast(this.translate("Test could not be saved. Is there any internet connexion problem ?"));
    }

    save() {
        if (this.test && !this.test.title) {
            this.test.title = this.miscellaneousService.translate(this.test.type) + " " + this.test.modificationDate;
        }

        this.test.score = this.questionnaireService.getScore(this.test.questions);
        this.test.options = this.testOptions;

        this.questionnaireService.saveQuestionnaire(
            (data: any) => this.successSave(data),
            (error: any) => this.failureSave(error),
            this.test
        );
    }
}