export const commands = [
  {
    name: 'definir',
    description: 'Define um canal ou um cargo de um determinado job ou permissão',
    default_permission: false,
    options: [
      {
        name: 'canal',
        description: 'Define o canal de um determinado job',
        type: 2,
        options: [
          {
            name: 'cafe',
            description: 'Define o canal do job de café',
            type: 1,
            options: [
              {
                name: 'canal',
                description: 'O canal para definir',
                type: 7,
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
];

export default commands;