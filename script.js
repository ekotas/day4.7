    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    function determinant3(a11,a12,a13,a21,a22,a23,a31,a32,a33) 
    {
    d = a11*a22*a33+a12*a23*a31+a13*a21*a32;
    d = d-a13*a22*a31-a12*a21*a33-a11*a23*a32;  
 
    return d
    }
class Graphics1d
{
    constructor(f,xmin,xmax,ymin,ymax,w,h,vec)
    {
        this.f=f;
        this.xmin=xmin;
        this.xmax=xmax;
        this.ymin=ymin;
        this.ymax=ymax;
        this.w=w;
        this.h=h;
        this.vec=vec;
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
            let det=determinant3(i*i,i,1,(i+step)*(i+step),(i+step),1,(i+2*step)*(i+2*step),(i+2*step),1);
            let dx=determinant3(vec[i-step],i,1,vec[i],(i+step),1,vec[i+step],(i+2*step),1);
            let dy=determinant3(i*i,vec[i-step],1,(i+step)*(i+step),vec[i],1,(i+2*step)*(i+2*step),vec[i+step],1);
            let dz=determinant3(i*i,i,vec[i-step],(i+step)*(i+step),(i+step),vec[i],(i+2*step)*(i+2*step),(i+2*step),vec[i+step]);
            let a=dx/det;
            let b=dy/det;
            let c=dz/det;
            let extr=-b/(2*a);
            if(extr<i-step || extr>i+step)
            {
                break;
            }
            else
                extremums.push(extr);
        }
    }
    evaluate()
    {
        for(let i=-this.w/2;i<this.w/2;i+=(this.xmax-this.xmin)/this.w)
        {
            this.vec[i]=this.f(i);
        }
    }
}


function Func()
{
let Xmax=document.getElementById("xmax");
let Xmin=document.getElementById("xmin");
let Ymax=document.getElementById("ymax");
let Ymin=document.getElementById("ymin");
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
    let vec=[];
    let graphic=new Graphics1d(f,xmin,xmax,ymin,ymax,w,h,vec);
    graphic.evaluate();
    graphic.draw();
}