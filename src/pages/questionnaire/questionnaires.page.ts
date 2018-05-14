import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ViewController, NavParams } from 'ionic-angular';
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

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, private popoverCtrl: PopoverController, public connexionTokenService: ConnexionTokenService) {
        super(miscellaneousService, navController, connexionTokenService);
    }

    loaded(event: any) {
        if (event) {
            this.questionnaires = event;
        }
        if (this.refresher) {
            this.refresher.complete();
        }
    }

    initPopover() {
        return {
            "object": this.questionnairesLocalComponent,
            "menus":
                [
                    {
                        "label": this.translate('New'),
                        "id": "newQuestionnaire"
                    },
                    {
                        "label": this.translate('Import'),
                        "id": "import"
                    },
                    {
                        "label": this.translate('Questionnaires'),
                        "id": "filterQuestionnaire"
                    },
                    {
                        "label": this.translate('Tests'),
                        "id": "filterTest"
                    },
                    {
                        "label": this.translate('Disabled'),
                        "id": "toggleFilterDisabled"
                    }
                ]
        };
    }

    public newQuestionnaire() {
        let q = this.questionnairesLocalComponent.newQuestionnaire();
        this.questionnairesLocalComponent.showModal(q);
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

    doRefresh(refresher) {
        this.refresher = refresher;
        this.refresh();
    }

}
