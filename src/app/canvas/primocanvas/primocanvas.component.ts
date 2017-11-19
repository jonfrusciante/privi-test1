import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UserService} from '../../user-profile/user.service';

@Component({
  selector: 'app-primocanvas',
  templateUrl: './primocanvas.component.html',
  styleUrls: ['./primocanvas.component.css'],
  providers: []
})
export class PrimocanvasComponent implements AfterViewInit {
  @ViewChild('myCanvas') myCanvas;
  @ViewChild('bandiere') bandiereCanvas;
  @Input() canavasLogodisplay = false;
  @Input() canavasProfiledisplay = false;
@Output() imagegurulink = new EventEmitter<string>();
  contextbandiera: CanvasRenderingContext2D;
  canvasBandiera:  HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  fileImage: string;
  public image =  new Image();
  public image1 =  new Image();
  constructor(private usrServ: UserService) {}

  ngAfterViewInit() {
    if (this.canavasProfiledisplay) { const canvas = this.myCanvas.nativeElement ;     this.context = canvas.getContext('2d');
    }else if (this.canavasLogodisplay) {
      const canvasBandiera = this.bandiereCanvas.nativeElement ;     this.canvasBandiera = canvasBandiera;    this.contextbandiera = canvasBandiera.getContext('2d');
    }
    this.image.src = '../../assets/mockupmagliette.png';
    this.image.addEventListener('load' , () => {
      this.tick();
    });
  }
// fine ng

  getfileimage(): string{
    return this.fileImage || '' ;
  }
  juve() {
    const ctx = this.contextbandiera;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 100, 75);
    ctx.fillRect(100, 85, 100, 75);
    ctx.fillStyle = 'orange';
    ctx.fillRect(24, 48, 150, 64);

  ctx.save();

}
  milan() {
    const ctx = this.contextbandiera;
    ctx.fillStyle = 'red';

    ctx.fillRect(0, 0, 100, 75);
    ctx.fillRect(100, 85, 100, 75);
    ctx.fillStyle = 'gray';
    ctx.fillRect(24, 48, 150, 64);
    ctx.save();


  }
  inter() {
    const ctx = this.contextbandiera;
    ctx.fillStyle = 'blue';

    ctx.fillRect(0, 0, 100, 75);
    ctx.fillRect(100, 85, 100, 75);
    ctx.fillStyle = 'black';
    ctx.fillRect(24, 48, 150, 64);
    ctx.save();


  }
  tick() {
      console.log(this.image);
      const ctx = this.context;
       ctx.fillStyle = 'rgb(200,0,0)'; // sets the color to fill in the rectangle with
      ctx.drawImage(this.image , 0 , 0  );
       ctx.save();

    // ctx.drawImage(this.image,134 , 10, 147, 129);   // draws the rectangle at position 10, 10 with a width of 55 and a height of 50

  }
inseriscitesto(testo: string) {
  const ctx = this.contextbandiera;
  ctx.restore();

  ctx.font = '48px serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';

  ctx.fillText(testo, 100, 95, 140);

  const file: string = this.save(ctx.canvas);
  this.savefile(file);

}
addimageinlogo(image) {
  this.image1.addEventListener('load' , () => {
    console.log('caricata');
    console.log(this.image1);
    const ctx = this.context;
    this.testcerchio();
  //  this.roundedImage(138, 9, 137, 110, 10);
    ctx.clip();
    ctx.drawImage(this.image1, 134, 10, 147, 129);
    ctx.save();
  });
  this.image1.src = image ;
}
  roundedImage(x, y, width, height, radius){
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
 //   const url = this.save(ctx.canvas);
  //  this.savefile(url);
  }
  testcerchio(){
    const ctx = this.context;
    ctx.beginPath();
    ctx.arc(75, 10, 20, 0, 2 * Math.PI, false);
    ctx.closePath();

  }
   save(contesto: HTMLCanvasElement): string {
  const canvas = contesto;
    const dataURL = canvas.toDataURL('image/jpeg');

    console.log(dataURL);
    return dataURL;
}

  savefile($event) {
    console.log($event);
    this.usrServ.getauttoken($event.split(',')[1]).subscribe( result => {
      this.fileImage = result.data.link ;
      this.imagegurulink.emit(result.data.link);
      console.log(this.fileImage);
    });
  //  const reader = new FileReader();
  //  if ( $event.length > 0) {
  //    const file = $event;
    //  reader.readAsDataURL(file);
    //  reader.onload = () => {
        // FAI QUALCOSA CON IL FILE PRONTO
   //     this.usrServ.getauttoken(reader.result.split(',')[1]).subscribe( result => {
   //       this.fileImage = result.data.link ;
   //       console.log(this.fileImage);
   //     });
        // this.canavas.nextpass(reader.result);
        // this.myForm.controls['logo'].setValue(reader.result.split(',')[1]);
        // chiamata ad imgurur!! per uplodare la foto e ricevere il link indietro
        // this.usrServ.getauttoken(reader.result.split(',')[1]).subscribe( result => {
        //   this.myForm.controls['logo'].setValue(result.data.link);
        // this.fileImage = result.data.link ; });
  //    };
    }
 // }

}
