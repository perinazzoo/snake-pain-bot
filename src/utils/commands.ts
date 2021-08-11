export const commands = [
  {
    name: 'canal',
    description: 'Define o canal de um determinado job',
    type: 1,
    options: [
      {
        name: 'cafe',
        description: 'Define o canal do job de café',
        type: 1,
        options: [
          {
            name: 'canal',
            description: 'Selecione um canal',
            type: 7,
            required: true
          }
        ]
      }
    ]
  }
];

export default commands;