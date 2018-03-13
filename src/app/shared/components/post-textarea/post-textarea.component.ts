import {
  Component,
} from '@angular/core';

import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostModel,
  SharePostResponse,
  CreatePost
} from '../../../shared/models';
import {
  PostService
} from '../../../../services/services';
declare let swal: any;

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor (private postService: PostService) {}

  protected toggleUploadComponent: boolean = false;
  protected post: PostModel = new PostModel();
  private createPost: CreatePost = new CreatePost();
  private postAttachments: Array<object> = [];
  private uploadImagesEmitterService = EmitterService.get('uploadImagesEmitter');
  private uploadCompleteSubscriber = EmitterService.get('uploadCompleteEmitter');
  private postSaveEmitterService = EmitterService.get('postSaveEmitter');

  public ngOnInit (): void {
    this.uploadComplete();
  }

  protected onAddPost (): void {
    if (this.createPost.message) {
      if (this.toggleUploadComponent) {
        this.uploadImagesEmitterService.emit('saveImages');
      } else {
        this.postMessageOnly();
      }
    } else {
      console.log('Post message is required.');
    }
  }

  private uploadComplete (): void {
    this.uploadCompleteSubscriber.subscribe(response => {
      this.postAttachments = response;
      if (response.length !== 0) {
        this.postWithAttachments();
      } else {
        this.postMessageOnly();
      }
    });
  }

  private postMessageOnly (): void {
    this.postService.createpost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      this.postSaveEmitterService.emit(response.postId);
    }, error => {
      console.log(error);
    });
  }

  private postWithAttachments (): void {
    this.createPost.attachments = this.postAttachments;
    this.toggleUploadComponent = false;
    this.postService.createpost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      this.postSaveEmitterService.emit(response.postId);
      this.createPost.message = '';
      this.createPost.attachments = [];
    }, error => {
      console.log(error);
    });
  }

  protected onShowUploadComponent (): void {
    this.toggleUploadComponent = !this.toggleUploadComponent;
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    // EmitterService.clear(['uploadCompleteEmitter']);
  }
}
