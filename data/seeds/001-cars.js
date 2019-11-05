
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 'dfjhf76', make: 'Audi', model: 'etron', mileage: 1000, transmission: 'auto', status_of_title: "clean"},
        {vin: 'dfjdgggg', make: 'Jaguar', model: 'iPace', mileage: 1000},
        {vin: 'dfj54641321', make: 'Chevrolet', model: 'Bolt', mileage: 1009760, transmission: 'auto', status_of_title: "clean"}
      ]);
    });
};
