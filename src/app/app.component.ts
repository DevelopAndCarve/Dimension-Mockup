import { Component } from '@angular/core';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeItemLookup,
  DropAction,
} from '@progress/kendo-angular-treeview';

const isOfType = (fileName: string, ext: string) =>
  new RegExp(`.${ext}\$`).test(fileName);
const isFile = (name: string) => name.split('.').length > 1;

@Component({
  selector: 'my-app',
  template: `
        <kendo-treeview
            [nodes]="dimensions"
            textField="text"
            kendoTreeViewHierarchyBinding
            childrenField="items"
            kendoTreeViewExpandable
            expandBy="id"
            [expandedKeys]="[1]"
            kendoTreeViewDragAndDrop
            kendoTreeViewDragAndDropEditing
            (nodeDragStart)="log('nodeDragStart', $event)"
            (nodeDrag)="log('nodeDrag', $event)"
            (nodeDrop)="handleDrop($event)"
            (addItem)="log('addItem', $event)"
            (removeItem)="log('removeItem', $event)"
            (nodeDragEnd)="log('nodeDragEnd', $event)"
        >
            <ng-template kendoTreeViewNodeTemplate let-dataItem>
                <span [ngClass]="iconClass(dataItem)"></span>
                {{ dataItem.text }}
            </ng-template>
            <ng-template kendoTreeViewDragClueTemplate let-action="action" let-destinationItem="destinationItem" let-text="text">
                <span class="k-drag-status k-icon" [ngClass]="getDragStatus(action, destinationItem)"></span>
                <span>{{ text }}</span>
            </ng-template>
        </kendo-treeview>

        <kendo-treeview
            [nodes]="hierarchies"
            textField="text"
            kendoTreeViewHierarchyBinding
            childrenField="items"
            kendoTreeViewExpandable
            expandBy="id"
            [expandedKeys]="[1]"
            kendoTreeViewDragAndDrop
            kendoTreeViewDragAndDropEditing
            (nodeDragStart)="log('nodeDragStart', $event)"
            (nodeDrag)="log('nodeDrag', $event)"
            (nodeDrop)="handleDrop($event)"
            (addItem)="log('addItem', $event)"
            (removeItem)="log('removeItem', $event)"
            (nodeDragEnd)="log('nodeDragEnd', $event)"
        >
            <ng-template kendoTreeViewNodeTemplate let-dataItem>
                <span [ngClass]="iconClass(dataItem)"></span>
                {{ dataItem.text }}
            </ng-template>
            <ng-template kendoTreeViewDragClueTemplate let-action="action" let-destinationItem="destinationItem" let-text="text">
                <span class="k-drag-status k-icon" [ngClass]="getDragStatus(action, destinationItem)"></span>
                <span>{{ text }}</span>
            </ng-template>
        </kendo-treeview>
    `,
})
export class AppComponent {
  public dimensions: any[] = [
    {
      id: 1,
      text: 'Customer',
      items: [
        { id: -1, text: 'Ship-To' },
        { id: 0, text: 'Planning Account' },
        { id: 1, text: 'Sold-To' },
        { id: 2, text: 'Level 2' },
        { id: 3, text: 'Level 3' },
        { id: 4, text: 'Level 4' },
        { id: 5, text: 'Level 5' },
        { id: 6, text: 'Total Customer' },
      ],
    },
  ];

  public hierarchies: any[] = [
    {
      id: 1,
      text: 'Hierarchies',
      items: [
        {
          id: 2,
          text: 'H1 - Commercial',
          items: [
            { id: -1, text: 'Ship-To' },
            { id: 0, text: 'Planning Account' },
            { id: 1, text: 'Sold-To' },
            { id: 2, text: 'Level 2' },
            { id: 3, text: 'Level 3' },
            { id: 4, text: 'Level 4' },
            { id: 5, text: 'Level 5' },
            { id: 6, text: 'Total Customer' },
          ],
        },
        {
          id: 6,
          text: 'H2 - Planning',
          items: [
            { id: 1, text: 'Sold-To' },
            { id: 3, text: 'Level 3' },
            { id: 5, text: 'Level 5' },
            { id: 6, text: 'Total Customer' },
          ],
        },
      ],
    },
  ];
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
    if (
      destinationItem &&
      action === DropAction.Add &&
      isFile(destinationItem.item.dataItem.text)
    ) {
      return 'k-i-cancel';
    }

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

    // prevent drop if attempting to add to file
    if (
      isFile(event.destinationItem.item.dataItem.text) &&
      event.dropPosition === DropPosition.Over
    ) {
      event.setValid(false);
    }
  }
}
