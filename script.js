// sonlar
let num1 = document.getElementById('son1'),
    num2 = document.getElementById('son2'),
    num3 = document.getElementById('son3'),
    num4 = document.getElementById('son4'),
    num5 = document.getElementById('son5'),
    num6 = document.getElementById('son6');

    // ishoralar
let indic1=document.getElementById('amal1'),
    indic2=document.getElementById('amal2'),
    indic3=document.getElementById('amal3'),
    indic4=document.getElementById('amal4'),
    indic5=document.getElementById('amal5');

let misol = document.getElementById('misol'),
    btn = document.getElementById('hisoblash').addEventListener('click',hisob);

function hisob() {
    // qiymat olish
    let misolV = String(misol.value).trim();
    // qiymatni tekshirish
    if(misolV.charCodeAt(0)>47 && misolV.charCodeAt(0) < 58 && misolV.charCodeAt(misolV.length-1)>47 &&  misolV.charCodeAt(misolV.length-1) < 58 )
    { }else{
        errors();
        return false;
    }
    for(let i=0;i<misolV.length;i++){
        let k=misolV.charCodeAt(i);
        if( k < 42 || k > 57 ){
            errors();
            return false;   
        }else{
            if(k==44 || k==46){
                errors();
                return false;
            }
        }
    }

    loading();
    // elementlarni izlish
    let A=[],k,n=0,j=0,l=0;
    misolV[misolV.length] ='+';
    for(let i=0;i<misolV.length+1;i++){
        k=misolV.charCodeAt(i);
        if( k > 47 && k < 58){
            n++;
        }else {
                A[j]=misolV.substring(l,i);
                j++;
                A[j]=misolV[i];
                l=i+1;
                j++;
        }
    }
    // Joylashtirish uchun
    num1.innerHTML=num2.innerHTML=num3.innerHTML=num4.innerHTML=num5.innerHTML=num6.innerHTML= "";
    indic1.innerHTML=indic2.innerHTML=indic3.innerHTML=indic4.innerHTML=indic5.innerHTML="";
    j=k=1;
    for (let i = 0; i <A.length-1; i++) {
        if( i == 11) break;
        if(i%2 == 1 && i<10){
            document.getElementById(`amal${j}`).innerHTML = A[i];
            j++;
        }else{
            document.getElementById(`son${k}`).innerHTML = A[i]; 
            k++;
        }
    }

    // amallar o'rnini aniqlash
    k=1;
    for(let i=1;i<10;i+=2){
        if(A[i]=='*'){ 
            document.getElementById(`isho${i}`).innerHTML=k;  k++;    }
        if(A[i]=='/'){ document.getElementById(`isho${i}`).innerHTML=k; k++; }
    }
    for(let i=1;i<10;i+=2){
        if(A[i]=='+'){ document.getElementById(`isho${i}`).innerHTML=k;   k++;    }
        if(A[i]=='-'){  document.getElementById(`isho${i}`).innerHTML=k;    k++;    }
    }
    // hisloblash

    let B=A;
    for(let i=1;i<10;i+=2){
        if(A[i]=='*'){ 
            B[i-1]=B[i+1] = Number(A[i-1]) * Number(A[i+1]);          
            B[i] = '=';
        }else{
            if(A[i]=='/'){ 
                B[i-1]=B[i+1] = Number(A[i-1]) / Number(A[i+1]);
                B[i] = '=';
            } 
        }
    }
    let t=true,C=0,b=true;
    for(let i=1;i<10;i+=2){
        if(B[i] != '='){ 
            t=false;  
            if(B[i]=='+'){
                if(b!=false){
                    C += Number(A[i-1]) + Number(A[i+1]); b=false;
                }
                else{
                    C+=Number(A[i+1]);
                }

            }else{
                if(B[i]=='-'){
                    if(b!=false){
                        C += Number(A[i-1]) - Number(A[i+1]); b=false;
                    }
                    else{
                        C-=Number(A[i+1]);
                    }
    
                }
            }
        }
    }
    if(t==true){
        document.getElementById('natija1').innerHTML = B[B.length-2] ;
    }else{
        document.getElementById('natija1').innerHTML = C;
    }
}


//  Xatoliklar
let error=document.getElementById('errors');
error.addEventListener('click',noactive);
function errors() {
    error.innerHTML = "Qiymat kiritilishda<br> xatolik"
    error.style.display = "block";
    setTimeout(noactive, 5000);
}
function noactive(){
    error.style.display = "none";
}

// ishlashda animatsiya
let load = document.querySelector('.loading');
function loading(){
    load.style.display = "block";
    setTimeout(() => {
        load.style.display = "none";
    }, 1800);
}