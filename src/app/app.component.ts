import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeItemLookup,
  DropAction,
  TreeItem,
} from '@progress/kendo-angular-treeview';
import { IDimensionNode, serverData } from './data.mocked';

const isOfType = (fileName: string, ext: string) =>
  new RegExp(`.${ext}\$`).test(fileName);
const isFile = (name: string) => name.split('.').length > 1;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  public data: serverData = new serverData();
  public activeItem: TreeItem;
  public focusEditor: boolean;
  public focusIndex: string;
  public textFormControl: FormControl;
  public selectedDimension: IDimensionNode[];

  public ngAfterViewInit(): void {
    this.selectedDimension = this.data.customerLevels;
  }

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

  public addEditorClass() {
    return {
      'k-i-edit': this.activeItem,
      'k-icon': true,
    };
  }
  public edit(item: TreeItem): void {
    // skip editing if same node is passed
    if (this.activeItem && this.activeItem.dataItem === item.dataItem) {
      return;
    }

    this.activeItem = item;

    this.focusEditor = true; // focus editor on next render
    this.focusIndex = item.index; // book keeping of the edited node index

    this.textFormControl = new FormControl(
      item.dataItem.text,
      Validators.required
    );
  }

  public editDimensionLevel(): void {
    this.textFormControl = new FormControl(
      this.activeItem.dataItem.text,
      Validators.required
    );
  }

  public cancel(): void {
    this.activeItem = null;
    this.textFormControl = null;
  }

  public save(): void {
    const { dataItem } = this.activeItem;

    // return focus to input if invalid
    if (this.textFormControl.invalid) {
      this.focusEditor = true;
      return;
    }

    // update the corresponding dataitem property
    dataItem.text = this.textFormControl.value;

    // close the editor
    this.cancel();
  }

  public handleEditorEnter(event: any): void {
    // prevent reopening the editor due to enter press
    event.stopPropagation();

    // persist the changes
    this.save();
  }

  public handleEditorFocusOut(
    event: FocusEvent,
    editorContainer: HTMLElement
  ): void {
    const focusTarget = event.relatedTarget as HTMLElement;

    // close the editor if the new focus target is not part of it
    if (!editorContainer.contains(focusTarget)) {
      this.cancel();
    }
  }

  public onCustDimClick(eventData: any) {
    this.switchDimension('CUST');
  }
  public onProdDimClick(eventData: any) {
    this.switchDimension('PROD');
  }
  public onUsersDimClick(eventData: any) {
    this.switchDimension('USERS');
  }
  private switchDimension(dimension: string) {
    switch (dimension) {
      case 'CUST':
        this.selectedDimension = this.data.customerLevels;
        break;
      case 'PROD':
        this.selectedDimension = this.data.productLevels;
        break;
      case 'USERS':
        this.selectedDimension = this.data.userLevels;
        break;
    }
  }
}
