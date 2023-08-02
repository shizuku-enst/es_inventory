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
    btn.disabled=true;
    const user=document.getElementById("user").value;
    const usercopy=document.getElementById("usercopy");
    const version=document.getElementById("version").value;
    const versioncopy=document.getElementById("versioncopy");
    const unit=document.getElementById("unit").value;
    const unitcopy=document.getElementById("unitcopy");
    const table=document.getElementById("table");
    let cnt=[];
    for(let i=0;i<5;i++){
        try{
            const tmp=document.getElementById("idol"+i).innerText;
            cnt.push(tmp);
        }
        catch(err){}
    }

    if(cnt.length>0)
        await fetch(`https://script.google.com/macros/s/AKfycbyFPBKSXc1SozfPNEVxBRA3JBLYkDYItbKgvZXXf72Ut-dmqAj5swkJQOEivpa59ZfW/exec?data=${usercopy.value}?${versioncopy.value}?${unitcopy.value}?${cnt.join("?")}`);
    while(table.firstChild ){
        table.removeChild( table.firstChild );
      }
    await fetch(`https://script.google.com/macros/s/AKfycbxH97Tal9oitcXSo99Z09ZelbD1iGxNKBKCYwB61-uW94rJyYAdkpjJsUmm0ApH80KKDg/exec/exec?data=${user}?${version}?${unit}`)
    .then(res=>res.json())
    .then(data=>{
        const key=Object.keys(data);
        let string=""
        for(let i=0;i<key.length;i++){
            string+=`<tr><th>${key[i]}</th><th id="idol${i}">${data[key[i]]}</th><th><button onclick="add(${i})">+</button></th><th><button onclick="dec(${i})">-</button></th></tr>`
        }
        table.insertAdjacentHTML("beforeend",string);
        unitcopy.value=unit;
        versioncopy.value=version;
        usercopy.value=user;
        document.getElementById("image").src=`./image/${version}.png`
        btn.disabled=false;
    })
}

function add(i){
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)+1
}

function dec(i){
    if(document.getElementById("idol"+i).innerText=="0") return
    document.getElementById("idol"+i).innerText=Number(document.getElementById("idol"+i).innerText)-1
}