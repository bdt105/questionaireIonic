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
import { SearchComponent } from '@appSharedComponents/search.component';
import { QuestionnairePage } from '@pages/questionnaire/questionnaire.page';
import { QuestionnairesPage } from '@pages/questionnaire/questionnaires.page';

@Component({
    selector: 'search-page',
    templateUrl: './search.page.html',
    providers: []
})

export class SearchPage extends GenericPage {

    @ViewChild('search') private searchComponent: SearchComponent;
    public refresher: any;

    public resultCount: number;

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, public popoverController: PopoverController,
        public connexionTokenService: ConnexionTokenService, toastController: ToastController) {
        super(miscellaneousService, navController, connexionTokenService, toastController);
    }

    initPopover() {
        return {
            "menus":
                [
                    {
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

    public getFilterCaption() {
        let caption = this.translate(this.searchComponent.filterType);
        if (this.searchComponent.filterType = "questionnaire") {
            caption += this.translate(this.searchComponent.filterType);
        }
        if (this.searchComponent.showDisabled) {
            caption += this.translate("disabled only");
        }
        return caption;
    }

    private action(action: string) {
        switch (action) {
            case "filterQuestionnaire":
                this.searchComponent.filterType = "questionnaire";
                break;
            case "filterTest":
                this.searchComponent.filterType = "test";
                break;
            case "noTest":
                this.searchComponent.filterType = null;
                this.searchComponent.showDisabled = null;
                break;
            case "toggleFilterDisabled":
                this.searchComponent.showDisabled = !this.searchComponent.showDisabled;
                break;

            default:
                break;
        }
    }

    showPopover(ev) {
        let menu = this.initPopover();
        let popover = this.popoverController.create(MenuPopover,
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

    searchInput(search: any) {
        let term = null;
        if (search) {
            term = search.target.value;
        }
        this.searchComponent.searchTerm = term;
        this.searchComponent.search();
    }

    refresh() {
        this.searchComponent.load();
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.refresh();
    }

    getCount(){
        return this.searchComponent ? this.searchComponent.getCount() : null;
    }

    searched(event: any) {
        if (this.refresher) {
            this.refresher.complete();
        }
    }

    goToQuestionnaires(){
        this.navController.push(QuestionnairesPage);
    }


}