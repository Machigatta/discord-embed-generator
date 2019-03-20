export class Sender {
    constructor(webhook,author_name,author_link,author_image,oUrl,oContent, oThumbnail, oFooter, oTitle, oColor, includeAuthorInEmbed){
        this.webhook = webhook;
        this.author_name = author_name;
        this.author_link = author_link;
        this.author_image = author_image;
        this.oUrl = oUrl;
        this.oContent = oContent;
        this.oThumbnail = oThumbnail;
        this.oFooter = oFooter;
        this.oTitle = oTitle;
        this.oColor = oColor;

        this.includeAuthorInEmbed = includeAuthorInEmbed;
    }

    sendDataToHook(){
        let eObject = {
            title: this.oTitle,
            type: "rich",
            description: this.oContent,
            url: this.oUrl,
            color: this.oColor,
            footer: {
                text: this.oFooter
            },
            thumbnail: {
                url: this.oThumbnail
            }
        }

        if(this.includeAuthorInEmbed){
            eObject.author = {
                name: this.author_name,
                url: this.author_link,
                icon_url: this.author_image
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.webhook, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            username: this.author_name,
            avatar_url: this.author_image,
            content: "",
            embeds: [
                eObject
            ]
        }));
        xhr.onload = function() {
            if(this.responseText){
                console.log(this.responseText);
                var data = JSON.parse(this.responseText);
                console.log(data);
            }
        }

    }
}