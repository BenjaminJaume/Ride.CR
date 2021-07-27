"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      {
        SenderId: 4,
        ReceiverId: 2,
        body: "Hey do you know where I can ski in Costa Rica?",
        ConversationId: 2,
        MessageStatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        SenderId: 3,
        ReceiverId: 2,
        body: "I think I've just seen the Chupacabra mae",
        ConversationId: 3,
        MessageStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        SenderId: 2,
        ReceiverId: 3,
        body: "For real?? Got any piX??",
        ConversationId: 3,
        MessageStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Messages", {});
  },
};
