'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('attends', [{
      employee_id: 1,
      type: 'Attend',
      startdate: '2022-07-18 09:00:00',
      enddate: '2022-07-18 18:00:00',
      workhours: 9,
      description: 'Lorem Ipsum',
      selfie: null,
      createdAt: '2022-07-20 07:30:00',
      updatedAt: '2022-07-20 07:30:00'
    },{
      employee_id: 1,
      type: 'Attend',
      startdate: '2022-07-19 09:00:00',
      enddate: '2022-07-19 18:00:00',
      workhours: 9,
      description: 'Lorem Ipsum',
      selfie: null,
      createdAt: '2022-07-20 07:30:00',
      updatedAt: '2022-07-20 07:30:00'
    }, {
      employee_id: 2,
      type: 'On Leave',
      startdate: '2022-07-18 00:00:00',
      enddate: '2022-07-18 00:00:00',
      workhours: 0,
      description: null,
      selfie: null,
      createdAt: '2022-07-20 07:30:00',
      updatedAt: '2022-07-20 07:30:00'
    }, {
      employee_id: 2,
      type: 'Attend',
      startdate: '2022-07-19 09:00:00',
      enddate: '2022-07-19 16:30:00',
      workhours: 7.5,
      description: 'Lorem Ipsum',
      selfie: null,
      createdAt: '2022-07-20 07:30:00',
      updatedAt: '2022-07-20 07:30:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('attends', null, {});
  }
};
