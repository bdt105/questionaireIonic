import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { ConfigurationService } from 'bdt105angularconfigurationservice';

import { Toolbox, Rest } from 'bdt105toolbox/dist';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionnaireLocalComponent } from '@components/questionnaire/questionnaireLocal.component';
import { Platform, NavParams, ViewController, ToastController, PopoverController, ModalController, NavController, AlertController, App } from 'ionic-angular';
import { MenuPopover } from '@components/popover/menu.popover';
import { GenericPage } from '@pages/generic.page';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { TesterComponent } from '@components/tester/tester.component';
import { TesterPage } from '@pages/tester/tester.page';

@Component({
    selector: 'questionnaire-page',
    templateUrl: './questionnaire.page.html',
    providers: []
})

export class QuestionnairePage extends GenericPage {

    public isModal: any;
    public id: string;
    public refresher: any;
    public searchBar: boolean;
    public questionnaire: any;
    public questionnaires: any;
    public test: string;

    @ViewChild('questionnaireLocal') private questionnaireLocalComponent: QuestionnaireLocalComponent;

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navController: NavController,
        public modalController: ModalController,
        public alertCtrl: AlertController, protected app: App,
        
        public configurationService: ConfigurationService,
        public questionnaireService: QuestionnaireService,
        public miscellaneousService: MiscellaneousService,
        public toastCtrl: ToastController, private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService) {
        super(miscellaneousService, navController, connexionTokenService, toastCtrl);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnInit() {
        this.isModal = this.params.get("isModal");
        this.id = this.params.get("id");
        if (this.id) {
            this.questionnaireLocalComponent.load(this.id);
        } else {
            this.questionnaire = this.params.get("questionnaire");
            this.questionnaires = this.params.get("questionnaires");
        }
    }

    initPopover() {
        return {
            "menus":
                [
                    {
                        "label": this.translate('Favorites'),
                        "id": "favorites"
                    },
                    {
                        "label": this.translate('Group'),
                        "id": "group"
                    }/*,
                    {
                        "label": this.translate('Edit'),
                        "id": "edit"
                    },
                    {
                        "label": this.translate('To clipboard'),
                        "id": "clipboard"
                    }*/,
                    {
                        "label": this.translate('Delete'),
                        "id": "delete"
                    }
                ]
        };
    }

    private action(action: string) {
        switch (action) {
            case "favorites":
                this.questionnaireLocalComponent.toggleFavorite();
                break;
            case "group":
                this.questionnaireLocalComponent.toggleGroup();
                break;
            case "group":
                this.questionnaireLocalComponent.toggleEdit();
                break;
            case "delete":
                this.questionnaireLocalComponent.delete();
                break;
            case "clipboard":
                this.questionnaireLocalComponent.copyToClipboard();
                this.toast(this.translate("Data copied to clipboard"));
                break;

            default:
                break;
        }
    }

    deleted() {
        this.dismiss();
    }

    showPopover(ev) {
        let menu = this.initPopover();
        let popover = this.popoverCtrl.create(MenuPopover,
            menu
        );
        popover.present({
            ev: ev
        });
        let callback = (data: any) => {
            this.action(data);
        }
        popover.onDidDismiss(
            (data: any) => callback(data)
        );
    }

    edit() {
        this.questionnaireLocalComponent.toggleEdit();
    }

    newQuestion() {
        if (this.questionnaireLocalComponent.questionnaire.showGroup) {
            let alert = this.alertCtrl.create({
                title: this.translate('New question'),
                subTitle: this.translate('Please un group your questionnaire first'),
                buttons: [this.translate('OK')]
            });
            alert.present();
        } else {
            this.questionnaireLocalComponent.newQuestion();
        }
    }

    searchInput(search: any) {
        let term = null;
        if (search) {
            term = search.target.value;
        }
        this.questionnaireLocalComponent.filterQuestions(term);
    }

    filtered() {
        this.questionnaire = this.questionnaireLocalComponent.questionnaire;
    }

    loaded() {
        this.questionnaire = this.questionnaireLocalComponent.questionnaire;
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.questionnaireLocalComponent.lastError) {
            this.toast(this.translate("No data could be retrived. Local data are displayed"));
        }
    }

    saved() {
        if (this.questionnaireLocalComponent.lastError) {
            this.toast(this.translate("No internet connexion available. No data were saved!"));
        }
    }

    toggleSearch() {
        this.searchBar = !this.searchBar;
        if (!this.searchBar) {
            this.questionnaireLocalComponent.refresh();
        }
    }

    refresh() {
        this.searchInput(null);
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.refresh();
    }

    resumeTest() {
        this.navController.push(TesterPage, {"testToResume": this.questionnaire});
        // this.app.getRootNav().setRoot(TesterPage, {"testToResume": this.questionnaire});
    }
}