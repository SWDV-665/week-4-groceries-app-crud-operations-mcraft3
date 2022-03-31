import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// Go up one extra level (add extra ../) to get app folder and back down to providers folder
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

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
    public dataService: GroceriesServiceProvider
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
    this.showEditItemPrompt(item, index);
  }

  // Add items using alertController.
  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  // Use Alert Controller Prompt to take input and add item to items array.
  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data  => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            // add new item to items array in grogeries-service.ts
            this.dataService.addItem(item);
          }
        }
      ]
      });
      prompt.present();
    }

  // Use Alert Controller Prompt to edit existing item in items array.
  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Please edit item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          // value: item.name. If item passed, use it, if not null.
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          // value: item.quantity. If qty passed, use it, if not null.
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data  => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Save clicked', item);
            // Edit item in items array in groceries-service.ts
            this.dataService.editItem(item, index);
          }
        }
      ]
      });
      prompt.present();
    }

}
