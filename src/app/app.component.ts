import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public selectedHierarchies: IDimensionNode[];
  public selectedDimensionCode: string = 'CUST';
  public dimensionForm: FormGroup;

  public ngAfterViewInit(): void {
    this.selectedDimension = this.data.getDimensionLevelNodes('CUST');
    this.selectedHierarchies = this.data.getHierarchies('CUST');
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
    this.data.addDimensionLevel(this.selectedDimensionCode, 'E001');
    this.selectedDimension = this.data.getDimensionLevelNodes(
      this.selectedDimensionCode
    );
  }

  public addHierarchy(node: any) {
    this.data.addHierarchy(this.selectedDimensionCode, 'E001');
    this.selectedHierarchies = this.data.getHierarchies(
      this.selectedDimensionCode
    );
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
  }

  /**
   * Create the form for editing the selected Dimension Level
   */
  public editDimensionLevel(): void {
    this.dimensionForm = new FormGroup({
      textFormControl: new FormControl(
        this.activeItem.dataItem.text,
        Validators.required
      ),
    });
  }

  public onCustDimClick(eventData: any) {
    this.selectedDimensionCode = 'CUST';
    this.switchDimension('CUST');
  }
  public onProdDimClick(eventData: any) {
    this.selectedDimensionCode = 'PROD';
    this.switchDimension('PROD');
  }
  public onUsersDimClick(eventData: any) {
    this.selectedDimensionCode = 'USER';
    this.switchDimension('USER');
  }
  private switchDimension(dimension: string) {
    this.selectedDimension = this.data.getDimensionLevelNodes(dimension);
    this.selectedHierarchies = this.data.getHierarchies(dimension);
  }
}
