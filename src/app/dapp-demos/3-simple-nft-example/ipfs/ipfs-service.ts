import { Injectable } from '@angular/core';
import { OnChainService } from '../on-chain.service';

declare global {
  interface Window {
    IpfsHttpClient: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  ipfs: any;
  loading = true;
  constructor(public onChainService: OnChainService) {}

  // async getFileObervable(hash:string){
  //   let myObject = '';
  //   from(this.ipfs.cat(hash)).pipe( 
  //     switchMap((buffer: Buffer) => {

  //     })
  //   )
  // }

  async getFile(hash: string): Promise<any> {
    const responseBufferChunks = []
    for await (const file of this.ipfs.cat(hash)) {
      if (!file) continue;
      responseBufferChunks.push(file);
    }
    const responseBuffer = Buffer.concat(responseBufferChunks)
    return JSON.parse(responseBuffer.toString())

  }

  async add(file: any) {
    return await this.ipfs.add(file);
  }
  async init() {
    if (this.loading == true) {
      await this.onChainService.loadTagToPromise({
        name: 'jsoneditor_css',
        type: 'link',
        args: [
          { name: 'rel', value: 'stylesheet' },
          {
            name: 'href',
            value: 'https://unpkg.com/jsoneditor@9.6.0/dist/jsoneditor.min.css',
          },
        ],
      });
      console.log('doen');
      await this.onChainService.loadTagToPromise({
        name: 'ipfs_client',
        type: 'script',
        args: [
          {
            name: 'src',
            value:
              'https://cdn.jsdelivr.net/npm/ipfs-http-client/dist/index.min.js',
          },
          { name: 'type', value: 'text/javascript' },
        ],
      });
      console.log('doen');
      this.ipfs = window.IpfsHttpClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      });
      this.loading = false;
    }
  }
}
