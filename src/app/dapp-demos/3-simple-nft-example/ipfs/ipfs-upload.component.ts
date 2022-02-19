import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { IpfsService } from './ipfs-service';
declare global {
  interface Window {
    IpfsHttpClient: any;
  }
}

@Component({
  selector: 'ipfs-upload',
  template: `
    <p>
      <json-editor
        [formControl]="ipfs_input"
        [options]="editorOptions"
      ></json-editor>
      <button
        (click)="uploadJson()"
        style="margin-top: 40px;"
        mat-raised-button
        color="accent"
      >
        Upload to IPFS
      </button>
      <mat-form-field
        style="margin-top: 10px;width: 100%;background: #d3d3d39e;"
        class="example-full-width"
        appearance="fill"
      >
        <input [formControl]="ipfs_cid" matInput placeholder="Your CID" />
      </mat-form-field>
    </p>
  `,
  styles: [
    `
      :host ::ng-deep json-editor,
      :host ::ng-deep json-editor .jsoneditor,
      :host ::ng-deep json-editor > div,
      :host ::ng-deep json-editor jsoneditor-outer {
        height: 375px;
      }
    `,
  ],
})
export class IpfsUploadComponent implements AfterViewInit {
  ipfs_cid: FormControl = new FormControl('');
  ipfs_input: FormControl = new FormControl();
  myJson = {
    description: "It's actually a bison?",
    external_url: 'https://austingriffith.com/portfolio/paintings/',
    image: 'https://austingriffith.com/images/paintings/buffalo.jpg',
    name: 'Buffalo',
    attributes: [
      { trait_type: 'BackgroundColor', value: 'green' },
      { trait_type: 'Eyes', value: 'googly' },
    ],
  };
  uploading = true;
  editorOptions: JsonEditorOptions;
  id!: string;
  version!: string;
  status!: string;
  constructor(public ipfsService: IpfsService) {
    this.ipfs_input.setValue(this.myJson);
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; // set all allowed modes
  }

  async uploadJson() {
    this.uploading = true;
    const result = await this.ipfsService.add(
      JSON.stringify(this.ipfs_input.value)
    );

    if (result && result.path) {
      this.ipfs_cid.setValue(result.path);
    }
    this.uploading = false;
  }

  ngAfterViewInit(): void {
    this.ipfsService.init();
  }
}
