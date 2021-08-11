export const commands = [
  {
    name: 'cafe',
    description: 'Acessa o contexto de cafe',
    type: 1,
    options: [
      {
        name: 'canal',
        description: 'Define o canal do contexto de café',
        type: 1,
        options: [
          {
            name: 'canal',
            description: 'Selecione um canal',
            type: 7,
            required: true
          }
        ]
      },
      {
        name: 'usuario',
        description: 'Gerencia um usuário na lista do café',
        type: 2,
        options: [
          {
            name: 'add',
            description: 'Adiciona um usuário à lista do café',
            type: 1,
            options: [
              {
                name: 'usuario',
                description: 'Selecione um usuário',
                type: 6,
                required: true
              }
            ]
          },
          {
            name: 'rm',
            description: 'Remove um usuário da lista do café',
            type: 1,
            options: [
              {
                name: 'usuario',
                description: 'Selecione um usuário',
                type: 6,
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