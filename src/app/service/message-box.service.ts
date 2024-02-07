import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private toaStr: ToastrService) { }

  error(message: string){
    this.toaStr.error(message,'ChatApp');
  }
  info(message: string){
    this.toaStr.info(message,'ChatApp');
  }
  success(message: string){
    this.toaStr.success(message,'ChatApp');
  }

}
