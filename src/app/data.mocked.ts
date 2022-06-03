export class serverData {
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
}
