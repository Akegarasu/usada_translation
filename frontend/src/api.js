data64 = ''
function imgOutput() {
    window.pageYoffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    //截图不全解决
    html2canvas(document.getElementById("imageWrapper"), {
        useCORS: true,
        logging: true
    }).then(canvas => {
        //let dataURL = canvas.toDataURL("image/png");
        //document.body.appendChild(canvas);
		data64 = canvas.toDataURL("image/png");
    });
	
}
function reta(){ 
    return data64;
}
function linkFormat(a){
        transText = a.replace(/https?:\/\/([^ \\n]+)/g, function (word) {
            console.log(word);
            return "<span class='link'>" + (
                word.replace(/https?:\/\//g, "").length > 25 ? (word.replace(/https?:\/\//g, "").substr(0, 25) + "...") : (word.replace(/https?:\/\//g, ""))
            ) + "</span>"
        })
            .replace(/(^@[^ \n]+|\n@[^ \n]+| @[^ \n]+|^#[^ \n]*[^1234567890 \n][^ \n]*|\n#[^ \n]*[^1234567890 \n][^ \n]*| #[^ \n]*[^1234567890 \n][^ \n]*)/g, "<span class='link'>$1</span>")
            .replace(/\n/g, "<br>")
            .replace(/  /g, "&nbsp; ");
        console.log(transText);   
        return transText
        //reCmd('orgintext','qiuye🌸\n\nhttp://baidu.com')
}
function Formatter(src){
    return twemoji.parse(linkFormat(src))
}
function eleInnerHtml(ele,src){
    document.getElementById(ele).innerHTML= src;
}
function reCmd(ele,src){
    src = Formatter(src)
    eleInnerHtml(ele,src)
}