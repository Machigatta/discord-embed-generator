import {Sender} from './sender';

export class App {
    constructor(){
        this.heading = "Send your stuff to Discord via Embeds";

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
        
        //validate block
        this.retMessage = '';
        this.clearData = false;
        this.includeAuthorInEmbed = false;
        this.error = {
            msg: "",
            color: ""
        };
        this.label_button = 'Send to webhook';
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

    sendToWebhook(){
        this.error = {
            msg: "",
            color: ""
        };

        this.label_button = 'Sending...';
        if(this.validate_fields()){
            let mysender = new Sender(this.senderWebhook,this.senderAuthorName,this.senderAuthorLink,this.senderAuthorImage,this.senderUrl, this.senderContent, this.senderThumbnail, this.senderFooter, this.senderTitle, this.senderColor, this.includeAuthorInEmbed);
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
            }
        }
        this.label_button = 'Send to webhook';
    }
}
