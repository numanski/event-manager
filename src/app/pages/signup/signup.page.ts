import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  @ViewChild(AuthFormComponent)
  signupForm: AuthFormComponent;
  data: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    // this.data = null;
    // this.barcodeScanner.scan().then(barcodeData => {

    //   // console.log('Barcode data', barcodeData);       
    //   this.data = barcodeData;

    //   if (this.data) {
    //     // Use the function name from Firebase
    //     const callable = this.functions.httpsCallable('check_barcode');

    //     // Create an Observable and pass any data you want to the function
    //     const obs = callable({ barcode: this.data });

    //     obs.subscribe(async res => {
    //       const alert = await this.alertController.create({
    //         header: "Barcode is verified",
    //         message: res.barcode,
    //         buttons: ['OK']
    //       });
    //       await alert.present();
    //     });


    //   } else {
    //     // return for new scan
    //   }


    // }).catch(err => {
    //   console.log('Error', err);
    // });

  }

  async signupUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.signupUser(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      await this.signupForm.hideLoading();
      this.router.navigateByUrl('home');
    } catch (error) {
      await this.signupForm.hideLoading();
      this.signupForm.handleError(error);
    }
  }
}
