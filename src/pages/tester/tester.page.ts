import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ViewController, NavParams, Slides, AlertController } from 'ionic-angular';
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
    public questions: any = [];
    public indexCurrentQuestion = 0;
    public pourcentage = 0;

    public numbers = [0, 1, 2];
    public tempSlides: any = [];

    @ViewChild('definition') slides: Slides;

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController,
        private alertController: AlertController, public navParams: NavParams,
        private questionnaireService: QuestionnaireService,
        private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService) {
        super(miscellaneousService, navController, connexionTokenService);
    }


    ngOnInit() {
        super.ngOnInit();
        this.testOptions = this.navParams.get("testOptions");
        this.questionnaires = this.navParams.get("questionnaires");
        this.questions = this.questionnaireService.generateQuestions(
            this.questionnaires, this.testOptions.randomQuestions, this.testOptions.jeopardy,
            this.testOptions.nbQuestions, this.testOptions.favoriteOnly);
        this.indexCurrentQuestion = 0;
        this.loadTempSlides();
    }

    loadTempSlides() {
        this.tempSlides.push(this.questions[this.indexCurrentQuestion]);
        if (this.questions.length > 1) {
            this.tempSlides.push(this.questions[this.indexCurrentQuestion + 1])
        }
    }

    updatePourcentage() {
        this.pourcentage = Math.round(this.indexCurrentQuestion / (this.questions.length - 1) * 100);
    }

    next() {
        let q = this.questions[this.indexCurrentQuestion];
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
        this.score = this.questionnaireService.getScore(this.questions);
    }
}
