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

async function dataget(btn){
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const version=document.getElementById("version").value;
    const versioncopy=document.getElementById("versioncopy");
    const unit=document.getElementById("unit").value;
    const unitcopy=document.getElementById("unitcopy");
    const membercopy=document.getElementById("membercopy").value;
    const table=document.getElementById("table");
    if(user==""||version==""||unit.match("-"))return
    btn.disabled=true;
    const write=document.getElementById("table").innerText.replace(/\+|\-|\t/g,"");

    //枚数書き込み
    if(write){
        console.log("1")
        if(membercopy=="none"){
            console.log("2")
            const send=write.match(/\d+/g).join("?");
            await fetch(`https://script.google.com/macros/s/AKfycbyFPBKSXc1SozfPNEVxBRA3JBLYkDYItbKgvZXXf72Ut-dmqAj5swkJQOEivpa59ZfW/exec?data=${usercopy.value}?${versioncopy.value}?${unitcopy.value}?${send}`);
        }
        else{
            const versionlist=document.getElementById("table");
            console.log(versionlist)
        }
    }
    //テーブル削除
    while(table.firstChild ){
        table.removeChild( table.firstChild );
    }
    //枚数取得
    await fetch(`https://script.google.com/macros/s/AKfycbxH97Tal9oitcXSo99Z09ZelbD1iGxNKBKCYwB61-uW94rJyYAdkpjJsUmm0ApH80KKDg/exec/exec?data=${user}?${version}?${unit}`)
    .then(res=>res.json())
    .then(data=>{
        const key=Object.keys(data);
        let string=""
        for(let i=0;i<key.length;i++){
            string+=`<tr><th>${key[i]}</th><td><img src="../img/${version}/${key[i]}.jpg" class="card"></td><td id="idol${i}">${data[key[i]]}</td><th><button onclick="add(${i})">+</button></th><th><button onclick="dec(${i})">-</button></th></tr>`
        }
        table.insertAdjacentHTML("beforeend",string);
        unitcopy.value=unit;
        versioncopy.value=version;
        usercopy.value=user;
        membercopy.value="none";
        document.getElementById("image").src=`./image/${version}.png`
        btn.disabled=false;
    })
}

//+ボタンの処理
function add(i){
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)+1
}

//-ボタンの処理
function dec(i){
    if(document.getElementById("idol"+i).innerText=="0") return
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)-1
}

//ページ遷移時に書き込みに行く
window.onbeforeunload = function(e) {
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const version=document.getElementById("version").value;
    const versioncopy=document.getElementById("versioncopy");
    const unit=document.getElementById("unit").value;
    const unitcopy=document.getElementById("unitcopy");
    const membercopy=document.getElementById("membercopy").value;
    const table=document.getElementById("table");
    if(user==""||version==""||unit.match("-"))return
    const write=document.getElementById("table").innerText.replace(/\+|\-|\t/g,"");

    //枚数書き込み
    if(write){
        if(membercopy=="none"){
            const send=write.match(/\d+/g).join("?");
            fetch(`https://script.google.com/macros/s/AKfycbyFPBKSXc1SozfPNEVxBRA3JBLYkDYItbKgvZXXf72Ut-dmqAj5swkJQOEivpa59ZfW/exec?data=${usercopy.value}?${versioncopy.value}?${unitcopy.value}?${send}`);
        }
        else{
            const versionlist=document.getElementById("table");
            console.log(versionlist)
        }
    }

}
