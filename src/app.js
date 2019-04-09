import {Sender} from './sender';

export class App {
    constructor(){
        this.heading = "Send your stuff to Discord via Embeds";
        this.label_button_send = 'Send to webhook';
        this.label_button_add_custom_field = 'Add custom field';
        this.label_button_remove_custom_field = 'Remove';
        this.label_button_clear_custom_field = 'Clear custom fields';

        //Author Block
        this.senderAuthorName = ''
        this.senderAuthorLink = ''
        this.senderAuthorImage = ''

        //meta block
        this.senderWebhook = '';
        this.senderUrl = '';
        this.senderContent = '';
        this.senderThumbnail = '';
        this.senderFooter = '';
        this.senderTitle = '';
        this.senderColor = "ff0000";
        
        //validate block
        this.retMessage = '';
        this.clearData = false;
        this.includeAuthorInEmbed = false;
        this.custom_fields = new Set();
        this.custom_fields_mock = new Set();
        this.aColors = [
            {name: "Black", code: "000000"},
            {name: "White", code: "ffffff"},
            {name: "Green", code: "008000"},
            {name: "Red", code: "ff0000"},
            {name: "Blue", code: "0000ff"},
            {name: "Cyan", code: "00ffff"},
            {name: "Purple", code: "9966ff"},
            {name: "Yellow", code: "ffff33"}
        ]
        this.error = {
            msg: "",
            color: ""
        };
        
    }

    validate_fields(){
        if (!this.senderWebhook) {
            this.error.msg = "Webhook must be set";
            this.error.color = "warning";
            return false;
        }else if (!this.senderContent) {
            this.error.msg = "Content must be set";
            this.error.color = "warning";
            return false;
        }else if (!this.senderAuthorName) {
            this.error.msg = "Author must be set";
            this.error.color = "warning";
            return false;
        }else{
            return true;
        }
    }

    customFieldHasChanged(){
        //really dirty
        this.custom_fields_mock = new Set(this.custom_fields);
        
    }

    addCustomField(){
        this.custom_fields.add({name:"",value:"", inline: true});
        //this.customFieldHasChanged();
    }

    clearCustomFields(){
        this.custom_fields.clear();
        //this.customFieldHasChanged();
    }

    removeSingleItemFromCustomFields(cObj){
        this.custom_fields.delete(cObj);
        //this.customFieldHasChanged();
    }

    sendToWebhook(){
        this.error = {
            msg: "",
            color: ""
        };

        this.label_button_send = 'Sending...';
        if(this.validate_fields()){
            let mysender = new Sender(this.senderWebhook,this.senderAuthorName,this.senderAuthorLink,this.senderAuthorImage,this.senderUrl, this.senderContent, this.senderThumbnail, this.senderFooter, this.senderTitle, parseInt("0x"+this.senderColor,16), Array.from(this.custom_fields), this.includeAuthorInEmbed);
            mysender.sendDataToHook();

            if(this.clearData){
            //Author Block
                this.senderAuthorName = ''
                this.senderAuthorLink = ''
                this.senderAuthorImage = ''

                //meta block
                this.senderWebhook = '';
                this.senderUrl = '';
                this.senderContent = '';
                this.senderThumbnail = '';
                this.senderFooter = '';
                this.senderTitle = '';
                this.senderColor = 0;
                this.custom_fields.clear();
            }
        }
        this.label_button_send = 'Send to webhook';
    }
}
