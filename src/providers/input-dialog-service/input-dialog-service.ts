import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
// Go up one extra level (add extra ../) to get app folder and back down to providers folder
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceProvider
  ) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

/*  
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
              this.dataService.items.push(item);
            }
          }
        ]
        });
        prompt.present();
      }
*/

  // Use Alert Controller Prompt to add or edit existing item in items array.
  // ? makes item optional for add case.
  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      // title: 'Edit Item'. if item, edit, if no item add
      title: item ? 'Edit Item' : 'Add Item',

      // message: "Please edit item...". if item, edit, if no item add
      message: item ? 'Please edit item...' : 'Please enter item...',
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
            if (index !== undefined) {
              // edit item in items array. Moved to Groceries-service.ts.
              this.dataService.editItem(item, index);
            }
            else {
              // add new item to items array. Moved to Groceries-service.ts.
              //this.items.push(item);
              this.dataService.addItem(item);
            }
          }
        }
      ]
      });
      prompt.present();
    }

}
