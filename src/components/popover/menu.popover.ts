import { ViewController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';

@Component({
    templateUrl: "./menu.popover.html"
})

export class MenuPopover {

    public menus: any;
    public object: any;
    
    constructor(private navParams: NavParams, public viewCtrl: ViewController, private miscellaneousService: MiscellaneousService) {
        this.menus = navParams.data.menus;
    }

    translate(text: string){
        return this.miscellaneousService.translate(text);
    }

    click(functio: string){
        this.viewCtrl.dismiss(functio);
    }
    
}
