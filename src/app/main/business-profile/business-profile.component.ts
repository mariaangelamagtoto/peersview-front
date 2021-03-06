import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';
import {
  SharedPostDetailModalComponent
} from '../../shared/modals/post-detail/post-detail.component';
import {
  ShowImageComponent
} from '../../shared/show-image/show-image.component';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {
  constructor (private dialog: MatDialog) {}

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }
  }

  protected openPostDetail (): void {
    this.dialog.open(SharedPostDetailModalComponent);
  }

  protected openAvatar (): void {
    this.dialog.open(ShowImageComponent, {
      data: {
        src: '/assets/images/toranto-uni.png'
      },
    });
  }
}
