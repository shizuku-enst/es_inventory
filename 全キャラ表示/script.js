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
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)+1;
}

//-ボタンの処理
function dec(i){
    if(document.getElementById("idol"+i).innerText=="0") return
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)-1;
}

//表示ボタンが押されたときの処理
async function memberget(btn){
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const versioncopy=document.getElementById("versioncopy");
    const version=document.getElementById("version").value;
    const table=document.getElementById("table");
    btn.disabled=true;
    const write=document.getElementById("table").innerText.replace(/\+|\-|\t/g,"");

    //枚数書き込み
    if(write){
        if(versioncopy!="none"){
            const tableData=document.getElementById("table").innerText.split(/\n/);
            tableData.shift()
            const tableData2=tableData.map(e=>e.split(/\t/))
            let send="";
            for(let i=0;i<tableData2.length;i++)
                send+=`?${tableData2[i][2]}`
            send=send.replace("?undefined")
            console.log(send);
            fetch(`https://script.google.com/macros/s/AKfycbze0MajIj7xYD8vosBxjZhS1tRZVyIswZo19vScfcsbE_D6tORHm-SFT9ZGE4-Z1MPEDQ/exec?data=${usercopy.value}?${versioncopy.value}${send}`);
        }
    }
    //テーブル削除
    while(table.firstChild ){
        table.removeChild( table.firstChild );
    }

    const idol=["天祥院英智","日々樹渉","伏見弓弦","姫宮桃李","明星スバル","氷鷹北斗","遊木真","衣更真緒","深海奏汰","南雲鉄虎","高峯翠","守沢千秋","仙石忍","天城一彩","白鳥藍良","礼瀬マヨイ","風早巽","乱凪砂","七種茨","巴日和","漣ジュン","斎宮宗","影片みか","葵ひなた","葵ゆうた","天城燐音","HiMERU","桜河こはく","椎名ニキ","朔間零","乙狩アドニス","大神晃牙","羽風薫","天満光","紫之創","仁兎なずな","真白友也","蓮巳敬人","鬼龍紅郎","神崎颯馬","月永レオ","朔間凛月","鳴上嵐","瀬名泉","朱桜司","逆先夏目","青葉つむぎ","春川宙","三毛縞斑"];
    await fetch(`https://script.google.com/macros/s/AKfycbwUfSsdZNOnFCq95W2lKZ6DCh_jcKXDMOiWEhfJDOgh1Jtts92n5IZ638VRD8IvVHQ/exec?data=${user}?${version}`)
    .then(res=>res.json())
    .then(data=>{
        let string=`<tr><th>キャラ</th><th>画像</th><th>枚数</th><th>ボタン</th></tr>`;
        for(let i=0;i<data.length;i++)
            string+=`<tr><td>${idol[i]}</td><td><img src="../img/${version}/${idol[i]}.jpg"></td><td id="idol${i}">${data[i]}</td><td><button onclick="dec(${i})">-</button>　<button onclick="add(${i})">+</button></td></tr>`;
        string+=`</table>`;
        table.insertAdjacentHTML("beforeend",string);
    })
    usercopy.value=user;
    versioncopy.value=version;
    btn.disabled=false;
}
