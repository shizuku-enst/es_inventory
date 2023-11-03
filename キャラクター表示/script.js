//+ボタンの処理
function add(i){
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)+1
}

//-ボタンの処理
function dec(i){
    if(document.getElementById("idol"+i).innerText=="0") return
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)-1
}

//過去弾の表示ボタンが押されたときの処理
async function memberget(btn){
    const member=document.getElementById("member").value;
    const membercopy=document.getElementById("membercopy");
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const versioncopy=document.getElementById("versioncopy");
    const unitcopy=document.getElementById("unitcopy");
    const table=document.getElementById("table");
    if(member.match("-")||user=="") return
    btn.disabled=true;
    const write=document.getElementById("table").innerText.replace(/\+|\-|\t/g,"");

    //枚数書き込み
    if(write){
        if(membercopy!="none"){
            const tableData=document.getElementById("table").innerText.split(/\n/);
            tableData.shift()
            const tableData2=tableData.map(e=>e.split(/\t/))
            let send="";
            for(let i=0;i<tableData2.length;i++)
                send+=`?${tableData2[i][0]}?${tableData2[i][2]}`
            await fetch(`https://script.google.com/macros/s/AKfycbw-hfbqj7e3YcRLyuim2K6jKPI3qiVrOjLCAJ_LZwPCBm6r_EO-4wagYvtZiiY8D1kR/exec?data=${usercopy.value}?${membercopy.value}${send}`);
        }
    }
    //テーブル削除
    while(table.firstChild ){
        table.removeChild( table.firstChild );
    }

    await fetch(`https://script.google.com/macros/s/AKfycbyH83DCGJvwJA5-c0PGmiLc7srwqM6PMehFvUBJxMmrnuluTMtbG7TWs5UY9vj2RANr/exec?data=${user}?${member}`)
    .then(res=>res.json())
    .then(data=>{
        let string=`<tr><th>バージョン</th><th>画像</th><th>枚数</th><th>ボタン</th></tr>`;
        for(let i=0;i<data.num.length;i++)
            string+=`<tr><td>${data.ver[i]}</td><td><img src="../img/${data.ver[i]}/${member}.jpg"></td><td id="idol${i}">${data.num[i]}</td><td><button onclick="dec(${i})">-</button>　<button onclick="add(${i})">+</button></td></tr>`;
        string+=`</table>`;
        table.insertAdjacentHTML("beforeend",string);
    })
    usercopy.value=user;
    membercopy.value=member;
    btn.disabled=false;
}