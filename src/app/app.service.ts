import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class EncryptionService {

    constructor() { }  
    
    encrypt(value : string) : string{
      return CryptoJS.AES.encrypt(value, environment.encryptionKey.trim()).toString();
    }  
    
    decrypt(value : string){
      return CryptoJS.AES.decrypt(value, environment.encryptionKey.trim()).toString(CryptoJS.enc.Utf8);
    }
    base64Encode(value: string){
      return btoa(value);
    }
    base64Decode(value: string){
      return atob(value);
    }
}