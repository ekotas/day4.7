    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    function determinant3(a11,a12,a13,a21,a22,a23,a31,a32,a33)
    {
    d = a11*a22*a33+a12*a23*a31+a13*a21*a32;
    d = d-a13*a22*a31-a12*a21*a33-a11*a23*a32;  
 
    return d;
    }
    function getExtra(border1,border2,border3,f)
    {
        let det=determinant3(border1*border1,border1,1,border2*border2,border1,1,border3*border3,border3,1);
        if(det!=0){
        let dx=determinant3(f(border1),border1,1,f(border2),border2,1,f(border3),border3,1);
        let dy=determinant3(border1*border1,f(border1),1,border2*border2,f(border2),1,border3*border3,f(border3),1);
        let dz=determinant3(border1*border1,border1,f(border1),border2*border2,border2,f(border2),border3*border3,border3,f(border3));
        let a=dx/det;
        let b=dy/det;
        let c=dz/det;
        let extr=-b/(2*a);
        return extr;
        }
        else
        return 0;
    }
class  Graphics1d
{
    constructor(f,xmin,xmax,ymin,ymax,w,h,dx)
    {
        this.dx=dx;
        this.f=f;
        this.xmin=xmin;
        this.xmax=xmax;
        this.ymin=ymin;
        this.ymax=ymax;
        this.w=w;
        this.h=h;
        this.vec=[];
        this.extremums=[];
    }
    draw()
    {
        ctx.beginPath();
        for(let i=-this.w/2;i<this.w/2;i+=(this.xmax-this.xmin)/this.w)
        {
            ctx.lineTo(i+this.w/2,-this.vec[i]+this.h/2);
            ctx.strokeStyle='red';
            ctx.stroke();
        }
        ctx.closePath();
        let step=(this.xmax-this.xmin)/this.w;
        for(let i=-this.w/2+step;i<this.w/2-step;i+=(this.xmax-this.xmin)/this.w)
        {
            let border1=i-step;
            let border2=i;
            let border3=i+step;
            let l=0;
            let extra=0;
            //console.log(border3-border1);
            let fdx=1e-20;
            let k=0;
            while(border3-border1>fdx)
            {
                let ff=this.f;
                let extr=getExtra(border1,border2,border3,ff);
                k++;
                if(extr!=0 || k>1000){
                if(extr<border1 || extr>border3)
                {
                    l=1;
                    break;
                }
                else
                {
                    border1=Math.min(extr,border2);
                    border2=Math.max(extr,border2);
                }
                //console.log(border1-border3);
                extra=extr;
                console.log("virubay");
            }
            else
                {
                    console.log("impossible to get extremum");
                    break;
                }
            }
            this.extremums.push(this.f(extra));
        }
    }
    evaluate()
    {
        for(let i=-this.w/2;i<this.w/2;i+=(this.xmax-this.xmin)/this.w)
        {
            this.vec[i]=this.f(i);
        }
    }
    getExtremums()
    {
        for(let i=0;i<this.extremums.length;i++)
        {
            if(this.extremums[i]!=0)
                    console.log(this.extremums[i]);
        }
    }
}


function Func()
{
let Xmax=document.getElementById("xmax");
let Xmin=document.getElementById("xmin");
let Ymax=document.getElementById("ymax");
let Ymin=document.getElementById("ymin");
let dX=document.getElementById("dx");
let dx=parseInt(dX.value);
console.log(dx);
let xmax=parseInt(Xmax.value);
let xmin=parseInt(Xmin.value);
let ymax=parseInt(Ymax.value);
let ymin=parseInt(Ymin.value);
    let tmp=document.getElementById("asd");
    let lol=tmp.value; let s1="";
    if(lol!=""){
        for(let i = 0; i < lol.length;i++){
          if(lol[i]!='x' && lol[i]!='+' && lol[i]!='-' && lol[i]!='/' 
             && lol[i]!='*' && lol[i]!='('&& lol[i]!=')' && !(lol[i]>='0' && lol[i]<='9')){
            s1+="Math."
            while(lol[i]!=')')
            {
                s1+=lol[i];
                i++;
            }
            s1+=lol[i];
          }
          else 
          {
            s1+=lol[i];
          }
        }
    }
    else
    {
        s1="x*x-9";
    }
    console.log(s1);
    let f=function(x){
        return eval(s1);
    }

let W=document.getElementById("width");
let H=document.getElementById("height");
let w=parseInt(W.value);
let h=parseInt(H.value);
canvas.width=w;
canvas.height=h;

ctx.beginPath();
ctx.moveTo(w/2,0);
ctx.lineTo(w/2,h);
ctx.moveTo(w,h/2);
ctx.lineTo(0,h/2);
ctx.strokeStyle="green";
ctx.stroke(); 
for(let i=0; i<=w;i+=w/((xmax-xmin)/10)){
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(i,0)
    ctx.lineTo(i,h);
    ctx.stroke();
    ctx.lineWidth=0.5;
}
for(let i=0; i<=h;i+=h/((ymax-ymin)/10)){
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(0,i)
    ctx.lineTo(w,i);
    ctx.stroke();
}
    ctx.closePath();
    let graphic=new Graphics1d(f,xmin,xmax,ymin,ymax,w,h,dx);
    graphic.evaluate();
    graphic.draw();
    graphic.getExtremums();
}
