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
    public test: any;
    public indexCurrentQuestion = 0;
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
        this.testOptions = this.navParams.get("testOptions");
        this.questionnaires = this.navParams.get("questionnaires");
        this.test = this.questionnaireService.newQuestionnaire("test");
        this.test.questions = this.questionnaireService.generateQuestions(
            this.questionnaires, this.testOptions.randomQuestions, this.testOptions.jeopardy,
            this.testOptions.nbQuestions, this.testOptions.favoriteOnly);
        this.indexCurrentQuestion = 0;
    }

    updatePourcentage() {
        this.test.pourcentage = Math.round(this.indexCurrentQuestion / (this.test.questions.length - 1) * 100);
    }

    next() {
        let q = this.test.questions[this.indexCurrentQuestion];
        this.checkQuestion(q);
        if (q.checked && (q.status || q.acknowleged)) {
            this.indexCurrentQuestion++;
            this.updatePourcentage();
            
        }
        q.acknowleged = true;
        if (!q.status){
            q.showAnswers = true;    
        }
    }

    previous() {
        this.indexCurrentQuestion--;
        this.updatePourcentage();
    }

    checkQuestion(question: any) {
        this.questionnaireService.checkQuestion(question, question.customAnswer, false);
        this.test.score = this.questionnaireService.getScore(this.test.questions);
    }

    private successSave(data: any){
        this.toast(this.translate("Test saved!"));
    }

    private failureSave(error: any){
        this.toast(this.translate("Test could not be saved. Is there any internet connexion problem ?"));        
    }

    save(){
        if (this.test && !this.test.title){
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