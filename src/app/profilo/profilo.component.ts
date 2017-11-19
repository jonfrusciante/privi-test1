import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PrimocanvasComponent} from '../canvas/primocanvas/primocanvas.component';
import {UserService} from '../user-profile/user.service';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@Component({

  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  @ViewChild(PrimocanvasComponent) canavas: PrimocanvasComponent;
  data: any;
  cropperSettings: CropperSettings;
  file: any;
  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 150;
    this.cropperSettings.height = 150;
    this.data = {};
    this.cropperSettings.rounded = true;

  }
  confermafoto(image) {
    console.log(image);
    this.canavas.addimageinlogo(image);
  }
  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }
  updateProfiloPreview($event) {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.canavas.addimageinlogo(reader.result);
      };
    }
  }

    ngOnInit() {
  }

}
