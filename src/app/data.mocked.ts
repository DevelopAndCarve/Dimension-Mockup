export interface IDimensionNode {
  id: number;
  text: string;
  isRoot: boolean;
  items: { id: number; text: string }[];
}

export class serverData {
  public addDimensionLevel(): void {
    const dim = { id: 7, text: 'New Dimension' };
    this.customerLevels[0]['items'].push(dim);
  }
  public addHierarchy(): void {
    const hier = { id: 10, text: 'New Hierarchy', items: [] };
    this.hierarchies[0]['items'].push(hier);
  }

  public customerLevels: IDimensionNode[] = [
    {
      id: 10,
      text: 'Customer',
      isRoot: true,
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

  public userLevels: IDimensionNode[] = [
    {
      id: 10,
      text: 'User',
      isRoot: true,
      items: [{ id: 0, text: 'Users' }],
    },
  ];
  public productLevels: IDimensionNode[] = [
    {
      id: 10,
      text: 'Product',
      isRoot: true,
      items: [
        { id: 0, text: 'Product SKU' },
        { id: 1, text: 'Product Consumer Unit' },
        { id: 2, text: 'Planning Group' },
        { id: 3, text: 'Level 2' },
        { id: 4, text: 'Level 3' },
        { id: 5, text: 'Level 4' },
        { id: 6, text: 'Level 5' },
      ],
    },
  ];

  public hierarchies: any[] = [
    {
      id: 1,
      isRoot: true,
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
}
