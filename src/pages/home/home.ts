import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// Go up one extra level (add extra ../) to get app folder and back down to providers folder
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Class variable for angular template of title of home.html page
  title = "Grocery";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceProvider,
    public inputDialogService: InputDialogServiceProvider
    ) {

  }

  // Get and initialize items in dataService.
  loadItems() {
    return this.dataService.getItems();
  }

  // remove item with object and it's index as parameters.
  removeItem(item, index) {
    console.log("Removing item - ", item, "index: ", index);
    // Display ionic toast component message alert to confirm item being removed.
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + 'index: ' + index + " ...",
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
    // Remove one object at given index.
    this.dataService.removeItem(index);
  }

  // Edit item with object and it's index as parameters.
  editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  // Add items using alertController.
  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

}
