import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { ConfigurationService } from 'bdt105angularconfigurationservice';

import { Toolbox, Rest } from 'bdt105toolbox/dist';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionnaireLocalComponent } from '@components/questionnaire/questionnaireLocal.component';
import { Platform, NavParams, ViewController, ToastController, PopoverController, ModalController, NavController, AlertController } from 'ionic-angular';
import { MenuPopover } from '@components/popover/menu.popover';
import { GenericPage } from '@pages/generic.page';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';

@Component({
    selector: 'questionnaire-page',
    templateUrl: './questionnaire.page.html',
    providers: []
})

export class QuestionnairePage extends GenericPage {

    refresher: any;
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
        public alertCtrl: AlertController,
        public configurationService: ConfigurationService,
        public questionnaireService: QuestionnaireService,
        public miscellaneousService: MiscellaneousService,
        public toastCtrl: ToastController, private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService) {
        super(miscellaneousService, navController, connexionTokenService);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnInit() {
        // this.questionnaireLocalComponent.__questionnaire = this.params.get("questionnaire");
        this.questionnaire = this.params.get("questionnaire");
        this.questionnaires = this.params.get("questionnaires");
        this.test = this.params.get("test");
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
                    },
                    {
                        "label": this.translate('Edit'),
                        "id": "edit"
                    },
                    {
                        "label": this.translate('Import'),
                        "id": "import"
                    },
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
                this.toogleFavorites();
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

    toogleFavorites() {
        this.questionnaireLocalComponent.toggleFavorite();
    }

    searchInput(search: any) {
        let term = null;
        if (search) {
            term = search.target.value;
        }
        let questionsFiltered = this.questionnaireLocalComponent.filterQuestions(term);
    }

    filtered() {
        this.questionnaire = this.questionnaireLocalComponent.questionnaire;
    }

    loaded() {
        this.questionnaire = this.questionnaireLocalComponent.questionnaire;
        if (this.refresher) {
            this.refresher.complete();
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
}