let change=new Set();
async function versionGet(user){
    const version=document.getElementById("version");
    while(version.firstChild ){
        version.removeChild( version.firstChild );
    }
    await fetch(`https://script.google.com/macros/s/AKfycbwfv8m1bMfPRlrQGZ50vSvWS3rMadLXsuwfsuv9bb6uJ00mgUOhzhXx3wgPiyLMWARr1w/exec?member=${user.value}`)
    .then(res=>res.json())
    .then(data=>data.map(sheet=>{
        let option=`<option>${sheet}</option>`;
        version.insertAdjacentHTML("beforeend",option);
    }))
}

//+ボタンの処理
function add(i){
    const usercopy=document.getElementById("usercopy").value;
    const versioncopy=document.getElementById("versioncopy").value;
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)+1;
    change.add(usercopy+"/"+versioncopy);
    const list=JSON.parse(window.sessionStorage.getItem(usercopy+"/"+versioncopy));
    list[i]=Number(document.getElementById("idol"+i).innerText);
    window.sessionStorage.setItem(usercopy+"/"+versioncopy,JSON.stringify(list));
}

//-ボタンの処理
function dec(i){
    if(document.getElementById("idol"+i).innerText=="0") return
    const usercopy=document.getElementById("usercopy").value;
    const versioncopy=document.getElementById("versioncopy").value;
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)-1;
    change.add(usercopy+"/"+versioncopy);
    const list=JSON.parse(window.sessionStorage.getItem(usercopy+"/"+versioncopy));
    list[i]=Number(document.getElementById("idol"+i).innerText);
    window.sessionStorage.setItem(usercopy+"/"+versioncopy,JSON.stringify(list));
}

//枚数情報の取得
async function sheetGet(){
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const version=document.getElementById("version").value;
    const versioncopy=document.getElementById("versioncopy");
    if(!window.sessionStorage.getItem(user+"/"+version)){
        document.getElementById("unit").disabled=true;
        await fetch(`https://script.google.com/macros/s/AKfycbwUfSsdZNOnFCq95W2lKZ6DCh_jcKXDMOiWEhfJDOgh1Jtts92n5IZ638VRD8IvVHQ/exec?data=${user}?${version}`)
            .then(res=>res.json())
            .then(data=>{
                window.sessionStorage.setItem(user+"/"+version,JSON.stringify(data));
            })
        document.getElementById("unit").disabled=false;
    }
    //テーブル削除
    while(table.firstChild ){
        table.removeChild( table.firstChild );
    }
    usercopy.value=user;
    versioncopy.value=version;
    tableMake();
}

function tableMake(){
    const unitData={"fine":[0,4],"Trickstar":[4,8],"流星隊":[8,13],"ALKALOID":[13,17],"Eden":[17,21],"Valkyrie":[21,23],"2wink":[23,25],"Crazy:B":[25,29],"UNDEAD":[29,33],"Ra*bits":[33,37],"紅月":[37,40],"Knights":[40,45],"Switch":[45,48],"MaM":[48,49]};
    const idol=["天祥院英智","日々樹渉","伏見弓弦","姫宮桃李","明星スバル","氷鷹北斗","遊木真","衣更真緒","深海奏汰","南雲鉄虎","高峯翠","守沢千秋","仙石忍","天城一彩","白鳥藍良","礼瀬マヨイ","風早巽","乱凪砂","七種茨","巴日和","漣ジュン","斎宮宗","影片みか","葵ひなた","葵ゆうた","天城燐音","HiMERU","桜河こはく","椎名ニキ","朔間零","乙狩アドニス","大神晃牙","羽風薫","天満光","紫之創","仁兎なずな","真白友也","蓮巳敬人","鬼龍紅郎","神崎颯馬","月永レオ","朔間凛月","鳴上嵐","瀬名泉","朱桜司","逆先夏目","青葉つむぎ","春川宙","三毛縞斑"];
    
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const version=document.getElementById("version").value;
    const versioncopy=document.getElementById("versioncopy");
    const unit=document.getElementById("unit").value;
    const unitcopy=document.getElementById("unitcopy");
    const table=document.getElementById("table");
    if(document.getElementById("unit").value.match("-")) return;
    //テーブル削除
    while(table.firstChild ){
        table.removeChild( table.firstChild );
    }
    const data=JSON.parse(window.sessionStorage.getItem(user+"/"+version));
    let string="";
    for(let i=unitData[unit][0];i<unitData[unit][1];i++){
        string+=`<tr><th>${idol[i]}</th><td><img src="../img/${version}/${idol[i]}.jpg" class="card"></td><td id="idol${i}">${data[i]}</td><th><button onclick="add(${i})">+</button></th><th><button onclick="dec(${i})">-</button></th></tr>`
    }
    table.insertAdjacentHTML("beforeend",string);
}

function keep(btn){
    btn.disabled=true;
    change.forEach(value=>{
        const user=value.split("/")[0];
        const version=value.split("/")[1];
        let send="?"+JSON.parse(window.sessionStorage.getItem(value)).join("?");
        fetch(`https://script.google.com/macros/s/AKfycbze0MajIj7xYD8vosBxjZhS1tRZVyIswZo19vScfcsbE_D6tORHm-SFT9ZGE4-Z1MPEDQ/exec?data=${user}?${version}${send}`);
    })
    btn.disabled=false;
    change.clear();
}