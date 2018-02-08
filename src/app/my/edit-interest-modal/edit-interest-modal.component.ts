import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatAutocomplete } from "@angular/material";
import { AccountSettingService } from '../../../services/accountsetting.service';

@Component({
  selector: 'app-edit-interest-modal',
  templateUrl: './edit-interest-modal.component.html',
  styleUrls: ['./edit-interest-modal.component.css']
})
export class EditInterestModalComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private accountSettingService: AccountSettingService
  ) { }

  private userInterests: Array<string>;
  private interests = [];
  private interestKeyword = null;
  private timeout = null;

  ngOnInit() {
    // Call here the service
    this.accountSettingService.getUserInterests()
      .subscribe((response: any) => {
        this.userInterests = response.interests;
      });
  }

  onClose() {
    this.dialog.closeAll();
  }

  onDelete(interest) {
    this.accountSettingService.removeUserInterest(interest.id)
      .subscribe(() => {
        let position = this.userInterests.indexOf(interest);
        this.userInterests.splice(position, 1);
      });
  }

  update() {
    console.log("Update Interests Commencing");
  }

  searchInterests() {
    clearTimeout(this.timeout);

    let self = this;
    this.timeout = setTimeout(function() {
      if (self.interestKeyword.length !== 0) {
        self.accountSettingService.searchInterests(self.interestKeyword)
          .subscribe((response: any) => {
            console.log('resp', response.interests)
            self.interests = response.interests;
          });
      } else {
        self.interests = [];
      }

    }, 500);
  }

  addSelectedInterest(interest) {
    let self = this;
    /* checking if the option already exists in the array,
      so the same option wont be added to the list again */
    if (!this.interestAlreadyAdded(interest, this.userInterests)) {
      this.userInterests.push(interest);

      setTimeout(function() {
        self.interestKeyword = null;
      }, 500);
    }
  }

  interestAlreadyAdded(obj, list) {
    for (let i = 0; i < list.length; i++) {
      let interestID = list[i].interestId !== undefined ? list[i].interestId : list[i].id;
      if (interestID === obj.id) {
        return true;
      }
    }
    return false;
  }

}
