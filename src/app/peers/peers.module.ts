/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  PeersComponent
} from './peers.component';
import {
  PeersListComponent
} from './list/list.component';
import {
  SharedModule
} from '../shared/components/shared.component';
import {
  peersRouting
} from './peers-routing.component';
import {
  PeersService
} from '../../services/peers.service';

@NgModule({
  imports : [
    peersRouting,
    SharedModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations : [
    PeersComponent,
    PeersListComponent
  ],
  exports: [],
  providers: [
    PeersService
  ]
})
export class PeersModule {}