import { Sender } from "./sender";

export class ExampleGen {
    constructor(webhook,author_name,author_link,author_image,oUrl,oContent, oThumbnail, oFooter, oTitle, oColor, cFields, includeAuthorInEmbed){
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
        this.cFields = cFields;

        this.includeAuthorInEmbed = includeAuthorInEmbed;
    }

    prepare_cURL(){
        let mysender = new Sender(this.webhook,this.author_name,this.author_link,this.author_image,this.oUrl, this.oContent, this.oThumbnail, this.oFooter, this.oTitle, parseInt("0x"+this.oColor,16), Array.from(this.cFields), this.includeAuthorInEmbed);
return `curl --request POST ^
--header "Content-Type:application/json" ^
--data "${JSON.stringify(mysender.prepareObject()).replace(/"/g, '\\\"')}" ^
${this.webhook}`;
    }

    prepare_JavaScript(){
return `let eObject = {
    title: "${this.oTitle}",
    type: "rich",
    description: "${this.oContent}",
    url: "${this.oUrl}",
    color: parseInt("0x"+"${this.oColor}",16),
    footer: {
        text: "${this.oFooter}"
    },
    thumbnail: {
        url: "${this.oThumbnail}"
    },
    fields: `+JSON.stringify(Array.from(this.cFields))+`
}
` + ((this.includeAuthorInEmbed) ? 
    (`    
eObject.author = {
    name: "${this.author_name}",
    url: "${this.author_link}",
    icon_url: "${this.author_image}"
}
    
`) : "") +`
var xhr = new XMLHttpRequest();
xhr.open("POST", "${this.webhook}", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    username: "${this.author_name}",
    avatar_url: "${this.author_image}",
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
}`;
    }

    prepare_PHP(){

        let fieldsArray = [];
        this.cFields.forEach(element => {
            fieldsArray.push(`[
                "name" => "${element.name}",
                "value" => "${element.value}",
                "inline" => ${element.inline}
            ]`);
        });

return `$hObject = [
    "username" => "${this.author_name}",
    "avatar_url" => "${this.author_image}",
    "tts" => false,
    "embeds" => [
        [
            "title" => "${this.oTitle}",
            "type" => "rich",
            "description" => "${this.oContent}",
            "url" => "${this.oUrl}",
            "timestamp" => date(DATE_ATOM, strtotime($date)),
            "color" => hexdec( "${this.oColor}" ),
            "footer" => [
                "text" => "${this.oFooter}"
            ],
            "thumbnail" => [
                "url" => "${this.oThumbnail}"
            ],
            "author" => [
                "name" => "${this.author_name}",
                "url" => "${this.author_link}",
                "icon_url" => "${this.author_image}"
            ],
            "fields" => [
                ${fieldsArray.join(",")}
            ]
        ]
    ]
];

$hObject = json_encode($hObject, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

$response = null;
$ch = curl_init();

curl_setopt_array( $ch, [
    CURLOPT_URL => "${this.webhook}",
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $hObject,
    CURLOPT_HTTPHEADER => [
        "Length" => strlen( $hObject ),
        "Content-Type" => "application/json"
    ]
]);
$response =curl_exec( $ch );
curl_close( $ch );

return $response;`
    }

    prepare_Python(){

        let fieldsArray = [];
        this.cFields.forEach(element => {
            fieldsArray.push(`embed.add_field(name="${element.name}", value="${element.value}", inline=${element.inline})`);
        });

return `#using discord.py
embed=discord.Embed(title="${this.oTitle}", url="${this.oUrl}", description="${this.oContent}", color=0x${this.oColor})
embed.set_author(name="${this.author_name}", url="${this.author_link}",, icon_url="${this.author_image}")
`+(this.oThumbnail != "" ? `embed.set_thumbnail(url="${this.oThumbnail}")` : ``)+`
`+fieldsArray.join("\n")+`
`+(this.oFooter != "" ? `embed.set_footer(text="${this.oFooter}")` : ``)+`
await channel.send(embed=embed)`;
    }
}