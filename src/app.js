import {Sender} from './sender';
import {ExampleGen} from './example';
import {BindingEngine} from 'aurelia-framework';
import Prism from 'prismjs';
import { isPrimitive } from 'util';

export class App {
    static inject = [BindingEngine];

    constructor(bindingEngine){
        this.bindingEngine = bindingEngine;
        this.heading = "Custom Embed to Discord";
        this.label_button_send = 'Send to webhook';
        this.label_button_add_custom_field = 'Add custom field';
        this.label_button_remove_custom_field = 'Remove';
        this.label_button_clear_custom_field = 'Clear custom fields';
        this.label_button_fill_with_demo_data = 'Demo-Data';
        this.label_button_reset_all_fields = 'Reset all Fields';

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
        this.includeAuthorInEmbed = true;
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

        this.exampleJS = "";
        this.examplePHP = "";
        this.examplePython = "coming soon";
        this.examplecURL = "";
    }

    attached() {
        this.buildExamples();
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderTitle')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderFooter')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderColor')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderThumbnail')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderContent')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderUrl')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderWebhook')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderAuthorImage')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderAuthorLink')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'senderAuthorName')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'includeAuthorInEmbed')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'includeAuthorInEmbed')
            .subscribe((newValue, oldValue) => { 
                this.buildExamples();
            });

            var tabButtons = [].slice.call(document.querySelectorAll('ul.tab-nav li a.button'));

            tabButtons.map(function(button) {
                button.addEventListener('click', function() {
                    document.querySelector('li a.active.button').classList.remove('active');
                    button.classList.add('active');
    
                    document.querySelector('.tab-pane.active').classList.remove('active');
                    document.querySelector(button.getAttribute('href')).classList.add('active');
                })
            })
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
        this.custom_fields_mock = new Set(this.custom_fields);
        this.buildExamples();
    }

    addCustomField(){
        this.custom_fields.add({name:"",value:"", inline: true});
        this.buildExamples();
    }

    clearCustomFields(){
        this.custom_fields.clear();
        this.buildExamples();
    }

    removeSingleItemFromCustomFields(cObj){
        this.custom_fields.delete(cObj);
        this.buildExamples();
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
                this.resetAllFields();
            }
        }
        this.label_button_send = 'Send to webhook';
    }

    buildExamples(){

        let exg = new ExampleGen(this.senderWebhook,
            this.senderAuthorName,
            this.senderAuthorLink,
            this.senderAuthorImage,
            this.senderUrl,
            this.senderContent,
            this.senderThumbnail,
            this.senderFooter,
            this.senderTitle,
            this.senderColor,
            this.custom_fields,
            this.includeAuthorInEmbed);


        // JS
        this.exampleJS = Prism.highlight(exg.prepare_JavaScript(),Prism.languages.javascript,'javascript');

        //PHP
        this.examplePHP = Prism.highlight(exg.prepare_PHP(),Prism.languages.php,'php');
            
        //python
        this.examplePython = Prism.highlight(exg.prepare_Python(),Prism.languages.python,'python');

        //cURL
        this.examplecURL = Prism.highlight(exg.prepare_cURL(),Prism.languages.shell,'shell');
    }

    resetAllFields(){
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
        this.senderColor = 'ff0000';
        this.custom_fields.clear();
    }

    fillWithDemoData(){
        this.senderAuthorName = 'OwO'
        this.senderAuthorLink = 'https://machigatta.com'
        this.senderAuthorImage = 'https://images.discordapp.net/avatars/408785106942164992/7f7a07bfad0ad6a2faaaccd9421e5392.png?size=512'

        //meta block
        this.senderWebhook = '';
        this.senderUrl = '';
        this.senderContent = `Fill me up OwO\n\nHinata Hyuga > Rikka Takanashi > Rest of your shit waifus `;
        this.senderThumbnail = 'http://2.bp.blogspot.com/-FR9zuHg5Ly0/U1XvSva4KiI/AAAAAAAAAWw/tgaemJdbJ50/h300/Rikka+(Render+188).png';
        this.senderFooter = '';
        this.senderTitle = '';
        this.senderColor = 'ff0000';
        this.includeAuthorInEmbed = true;
        this.custom_fields.clear();
    }
}
