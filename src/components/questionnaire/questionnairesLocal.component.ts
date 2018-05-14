import { Component, Output, EventEmitter, Input } from '@angular/core';

import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';

import { QuestionnairesComponent } from '@appSharedComponents/questionnaires.component';
import { ModalController } from 'ionic-angular';
import { QuestionnairePage } from '@pages/questionnaire/questionnaire.page';

@Component({
    selector: 'questionnairesLocal',
    templateUrl: './questionnairesLocal.component.html',
    providers: []
})

export class QuestionnairesLocalComponent extends QuestionnairesComponent {

    @Input() test: boolean = false;

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    constructor(public questionnaireService: QuestionnaireService, public miscellaneousService: MiscellaneousService, public modalCtrl: ModalController){
        super(questionnaireService, miscellaneousService);
    }

    showModal(questionnaire: any) {
        let modal = this.modalCtrl.create(QuestionnairePage, {"questionnaire": questionnaire, "questionnaires": this.questionnaires});
        modal.onDidDismiss(() => {
            this.load();
        });            
        modal.present();
    }    


/*
    import(){
        this.bsModalRef = this.modalService.show(ConfirmationComponent);
        this.bsModalRef.content.modalRef = this.bsModalRef;
        this.bsModalRef.content.title = this.translate("Importing a questionnaire");
        this.bsModalRef.content.readOnly = false;
        this.bsModalRef.content.bodyMessage = this.translate("Paste json format below and import");
        this.bsModalRef.content.button2Label = this.translate("Cancel");
        this.bsModalRef.content.button1Label = this.translate("Import");
        this.bsModalRef.content.button1Click.subscribe(result => {
            let json = this.bsModalRef.content.message;
            if (this.toolbox.isJson(json)){
                let questionnaire = JSON.parse(json);
                let date = this.toolbox.dateToDbString(new Date());
                questionnaire.creationDate = date;
                questionnaire.modificationDate = date;
                questionnaire.type = "questionnaire";
                if (!questionnaire.title){
                    questionnaire.title = this.translate('Import') + " " + date;
                }
                this.questionnaires = this.questionnaireService.importQuestionnaire(questionnaire, this.questionnaires);
            }
        })
    }
*/
}