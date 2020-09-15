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

function reta() {
    return data64;
}

function linkFormat(a) {
    transText = a.replace(/https?:\/\/([^ \\n]+)/g, function(word) {
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

function Formatter(src) {
    return twemoji.parse(linkFormat(src))
}

function eleInnerHtml(ele, src) {
    document.getElementById(ele).innerHTML = src;
}

function reCmd(ele, src) {
    src = Formatter(src)
    eleInnerHtml(ele, src)
}
var imgs = ["https://www.w3school.com.cn/i/eg_tulip.jpg", "https://www.w3school.com.cn/i/eg_tulip.jpg", "https://www.w3school.com.cn/i/eg_tulip.jpg"];
//测试图片

function imgShow(imgs) { //图片生成
    var imgrow = document.getElementById("imgrow");
    if (imgs.length == 1) {
        var img1 = document.createElement("img");
        img1.classList.add("contentimg");
        img1.src = imgs[0];
        img1.style.width = "100%";
        imgrow.appendChild(img1);
    } else if (imgs.length == 2) {
        var img1 = document.createElement("img");
        var col1 = document.createElement("div");
        col1.classList.add("col");
        col1.style.width = "316px";
        col1.style.paddingRight = "2px";
        col1.style.overflow = "hidden";
        img1.classList.add("contentimg");
        img1.src = imgs[0];
        var img2 = document.createElement("img");
        var col2 = document.createElement("div");
        col2.classList.add("col");
        col2.style.width = "316px";
        col2.style.paddingLeft = "2px";
        col2.style.overflow = "hidden";
        img2.classList.add("contentimg");
        img2.src = imgs[1];
        col1.appendChild(img1);
        col2.appendChild(img2);
        imgrow.appendChild(col1);
        imgrow.appendChild(col2);
    } else if (imgs.length == 3) {
        var img1 = document.createElement("img");
        var col1 = document.createElement("div");
        col1.classList.add("col");
        col1.style.width = "50%";
        col1.style.overflow = "hidden";
        img1.classList.add("contentimg");
        img1.src = imgs[0];
        var col2 = document.createElement("div");
        col2.classList.add("col");
        col2.style.width = "50%";
        col2.style.overflow = "hidden";
        var row21 = document.createElement("div");
        row21.classList.add("row");
        var img21 = document.createElement("img");
        img21.style.marginLeft = "4px";
        img21.classList.add("contentimg");
        img21.style.maxHeight = "200px"
        img21.src = imgs[1];
        var row22 = document.createElement("div");
        row22.classList.add("row");
        var img22 = document.createElement("img");
        img22.style.marginLeft = "4px";
        img22.classList.add("contentimg");
        img22.style.maxHeight = "200px"
        img22.src = imgs[2];
        row21.style.paddingBottom = "2px";
        row22.style.paddingTop = "2px";
        row21.appendChild(img21);
        row22.appendChild(img22);
        col2.appendChild(row21);
        col2.appendChild(row22);
        col1.appendChild(img1);
        imgrow.appendChild(col1);
        imgrow.appendChild(col2);
    } else if (imgs.length == 4) {
        var img11 = document.createElement("img");
        var img12 = document.createElement("img");
        var img21 = document.createElement("img");
        var img22 = document.createElement("img");
        img11.src = imgs[0];
        img12.src = imgs[1];
        img21.src = imgs[2];
        img22.src = imgs[3];
        img11.classList.add("contentimg");
        img12.classList.add("contentimg");
        img21.classList.add("contentimg");
        img22.classList.add("contentimg");
        img11.maxHeight = "200px";
        img12.maxHeight = "200px";
        img21.maxHeight = "200px";
        img22.maxHeight = "200px";
        var row1 = document.createElement("div");
        var row2 = document.createElement("div");
        row1.classList.add("row");
        row2.classList.add("row");
        var col11 = document.createElement("div");
        var col12 = document.createElement("div");
        var col21 = document.createElement("div");
        var col22 = document.createElement("div");
        col11.classList.add("col");
        col12.classList.add("col");
        col21.classList.add("col");
        col22.classList.add("col");
        col11.style.width = "316px";
        col12.style.width = "316px"
        col21.style.width = "316px"
        col22.style.width = "316px"
        col11.style.height = "200px";
        col12.style.height = "200px"
        col21.style.height = "200px"
        col22.style.height = "200px"
        col11.style.paddingRight = "4px"
        col21.style.paddingRight = "4px";
        col11.appendChild(img11);
        col12.appendChild(img12);
        col21.appendChild(img21);
        col22.appendChild(img22);
        row1.style.paddingBottom = "2px";
        row2.style.paddingTop = "2px";
        row1.appendChild(col11);
        row1.appendChild(col12);
        row2.appendChild(col21);
        row2.appendChild(col22);
        var col1 = document.createElement("div");
        col1.classList.add("col");
        col1.style.height = "100%";
        col1.style.width = "100%";
        col1.appendChild(row1);
        col1.appendChild(row2);
        imgrow.appendChild(col1);
    }
}