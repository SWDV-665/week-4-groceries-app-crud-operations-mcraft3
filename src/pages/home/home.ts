import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Class variable for angular template of title of home.html page
  title = "Grocery";

  // Array of items
  items = [
    {
      name: "Milk",
      quantity: 2 
    },
    {
      name: "Bread",
      quantity: 1 
    },    
    {
      name: "Banana",
      quantity: 3 
    },
    {
      name: "Sugar",
      quantity: 1 
    },
  ];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {

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
    this.items.splice(index, 1);
  }

  editItem(item, index) {
    console.log("Edit item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }

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
            // add new item to items array
            this.items.push(item);
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
            this.items[index] = item;
          }
        }
      ]
      });
      prompt.present();
    }

}
