import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ViewController, NavParams, ToastController, App } from 'ionic-angular';
import { GenericPage } from '../generic.page';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { MenuPopover } from '../../components/popover/menu.popover';
import { QuestionnairesLocalComponent } from '../../components/questionnaire/questionnairesLocal.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';

@Component({
    selector: 'questionnaires-page',
    templateUrl: 'questionnaires.page.html'
})

export class QuestionnairesPage extends GenericPage {

    searchBar: boolean;
    public questionnaires: any;
    public popoverMenu: any;
    public searchTerm: string;

    public refresher: any;

    @ViewChild('questionnairesLocal') private questionnairesLocalComponent: QuestionnairesLocalComponent;

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, public app: App,
        private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService, public toastCtrl: ToastController) {
        super(miscellaneousService, navController, connexionTokenService, toastCtrl);
    }

    loaded(event: any) {
        if (event) {
            this.questionnaires = event;
        }
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.questionnairesLocalComponent.lastError == "DATA_FROM_LOCAL") {
            this.toast(this.translate('No connexion possible, local data loaded.'));
        }
        if (this.questionnairesLocalComponent.lastError == "NO_FROM_LOCAL") {
            this.toast(this.translate('No connexion possible and no local data loaded.'));
        }
        console.log(this.questionnairesLocalComponent)
    }

    initPopover() {
        return {
            "object": this.questionnairesLocalComponent,
            "menus":
                [
                    {
                        "label": this.translate('Filter'),
                        "type": "header",
                        "icon": "funnel"
                    }, {
                        "label": this.translate('Questionnaires'),
                        "id": "filterQuestionnaire"
                    },
                    {
                        "label": this.translate('Tests'),
                        "id": "filterTest"
                    },
                    {
                        "label": this.translate('Show disabled'),
                        "id": "toggleFilterDisabled"
                    },
                    {
                        "label": this.translate('All'),
                        "id": "noFilter"
                    }
                ]
        };
    }

    public newQuestionnaire() {
        let q = this.questionnairesLocalComponent.newQuestionnaire();
        this.questionnairesLocalComponent.showQuestionnaire(q);
    }

    private action(action: string) {
        switch (action) {
            case "newQuestionnaire":
                this.newQuestionnaire()
                break;
            case "import":
                this.questionnairesLocalComponent.import();
                break;

            case "filterQuestionnaire":
                this.questionnairesLocalComponent.filterQuestionnaire();
                break;

            case "filterTest":
                this.questionnairesLocalComponent.filterTest();
                break;

            case "toggleFilterDisabled":
                this.questionnairesLocalComponent.toggleFilterDisabled();
                break;

            case "noFilter":
                this.questionnairesLocalComponent.toggleNoFilter();
                break;

            default:
                break;
        }
    }

    searchInput(search: any) {
        let term = null;
        if (search) {
            term = search.target.value;
        }
        this.questionnairesLocalComponent.searchTerm = term;
        this.questionnairesLocalComponent.load();
    }

    refresh() {
        this.searchInput(null);
    }

    toggleSearch() {
        this.searchBar = !this.searchBar;
        if (!this.searchBar) {
            this.refresh()
        }
    }

    showPopoverFilter(ev) {
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

    doRefresh(refresher) {
        this.refresher = refresher;
        this.refresh();
    }

    getFilterCaption() {
        if (this.questionnairesLocalComponent) {
            return this.questionnairesLocalComponent.getFilterCaption();
        }
        return "toto";
    }

    menuBarClick(page: any){
        this.app.getRootNav().setRoot(page.component);
    }    
}
