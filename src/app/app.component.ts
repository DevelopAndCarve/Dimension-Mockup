import { Component } from '@angular/core';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeItemLookup,
  DropAction,
} from '@progress/kendo-angular-treeview';
import { serverData } from './data.mocked';

const isOfType = (fileName: string, ext: string) =>
  new RegExp(`.${ext}\$`).test(fileName);
const isFile = (name: string) => name.split('.').length > 1;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public data: serverData = new serverData();

  public iconClass({ text }: any): any {
    return {
      'k-i-file-pdf': isOfType(text, 'pdf'),
      'k-i-folder': !isFile(text),
      'k-i-html': isOfType(text, 'html'),
      'k-i-image': isOfType(text, 'jpg|png'),
      'k-icon': true,
    };
  }

  public getDragStatus(
    action: DropAction,
    destinationItem: TreeItemLookup
  ): string {
    switch (action) {
      case DropAction.Add:
        return 'k-i-plus';
      case DropAction.InsertTop:
        return 'k-i-insert-up';
      case DropAction.InsertBottom:
        return 'k-i-insert-down';
      case DropAction.InsertMiddle:
        return 'k-i-insert-middle';
      case DropAction.Invalid:
      default:
        return 'k-i-cancel';
    }
  }

  public log(event: string, args?: any): void {
    console.log(event, args);
  }

  public handleDrop(event: TreeItemDropEvent): void {
    this.log('nodeDrop', event);
    this.log('nodeDrop Target', event.destinationItem.item);
  }
  public addDimensionLevel(node: any) {
    this.data.addDimensionLevel();
  }

  public addHierarchy(node: any) {
    this.data.addHierarchy();
  }

  public addIconClass(node: any) {
    if (!node.isRoot) return null;
    return {
      'k-i-add': node,
      'k-icon': true,
    };
  }
}
