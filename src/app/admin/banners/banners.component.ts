import { Component, OnInit } from '@angular/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ENV } from '../../env.config';
import { BannersService } from '../../services/banners.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
 
 bannerForm = new FormGroup({
    banner: new FormControl('',Validators.required),
    status: new FormControl(null,Validators.required),
  });
  showModel: boolean = false;
  public config: DropzoneConfigInterface = {};
  
  constructor() { }

  ngOnInit() { }


  modelopen(id)
  {    
    this.showModel = true;
  }
  bannerType(event:any){
console.log(event);
  }

}
