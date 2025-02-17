// import supertest from 'supertest';
// import app from '../../src/app';
// import { di } from '../../src/di';
// import RoomRepository from '../../src/repositories/room.repository';
// import FilterService from '../../src/services/filter.service';
// import RoomService from '../../src/services/room.service';
// import { addDays } from 'date-fns';


// describe('FilterController', () => {
//   let request = supertest(app);
//   let mockRoomRepository: RoomRepository;
//   let mockRoomService: RoomService;

//   beforeEach(() => {
//     mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
//     mockRoomService = new RoomService(mockRoomRepository);
  
//     jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockImplementation(async () => [
//         {
//           id: '1',
//           pj_id: 'PJ123',
//           description: 'Quarto confortável com vista para o mar',
//           type: 'Luxo',
//           price: 500,
//           capacity: 2,
//           caracteristics_ids: [],
//           local: 'Recife',
//           stars: 4,
//           ar_condicionado: true,
//           tv: true,
//           wifi: true,
//           petFriendly: false,
//           cafeDaManha: true,
//           estacionamento: true,
//           avaliacao: 4.5,
//         },
//       ]);
      

//     // 🔥 Garante que a função 'buscarAcomodacoes' retorna a acomodação mockada
//     jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockImplementation(async () => [
//       {
//         id: '1',
//         pj_id: 'PJ123',
//         description: 'Quarto confortável com vista para o mar',
//         type: 'Luxo',
//         price: 500,
//         capacity: 2,
//         caracteristics_ids: [],
//         local: 'Recife',
//         stars: 4,
//         ar_condicionado: true,
//         tv: true,
//         wifi: true,
//         petFriendly: false,
//         cafeDaManha: true,
//         estacionamento: true,
//         avaliacao: 4.5,
//       },
//     ]);
//   });
  
//   it('deve retornar acomodações filtradas', async () => {
//     const destino = 'Recife';
//     const dataCheckIn = addDays(new Date(), 1).toISOString().split('T')[0];
//     const dataCheckOut = addDays(new Date(), 3).toISOString().split('T')[0];
//     const numHospedes = 2;

//     const resposta = await request.get('/api/filtrar-acomodacoes').query({
//         destino,
//         data_ida: dataCheckIn,
//         data_volta: dataCheckOut,
//         num_pessoas: numHospedes,
//     });
   
//     expect(resposta.status).toBe(200);
//     expect(resposta.body).toEqual([
//         expect.objectContaining({ id: '1', description: 'Quarto confortável com vista para o mar' })
//     ]);

//   });

//   it('deve retornar uma mensagem quando nenhuma acomodação corresponder', async () => {
//     jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([]);

//     const resposta = await request.get('/api/filtrar-acomodacoes').query({
//       destino: 'Recife',
//       data_ida: addDays(new Date(), 1).toISOString().split('T')[0],
//       data_volta: addDays(new Date(), 3).toISOString().split('T')[0],
//       num_pessoas: 2,
//     });

//     expect(resposta.status).toBe(200);
//     expect(resposta.body).toEqual({ message: 'Nenhuma acomodação atende aos filtros selecionados.' });
//   });

//   it('deve retornar um erro quando ocorrer uma exceção', async () => {
//     jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockRejectedValue(new Error('Erro no banco de dados'));

//     const resposta = await request.get('/api/filtrar-acomodacoes').query({
//       destino: 'Recife',
//       data_ida: addDays(new Date(), 1).toISOString().split('T')[0],
//       data_volta: addDays(new Date(), 3).toISOString().split('T')[0],
//       num_pessoas: 2,
//     });

//     expect(resposta.status).toBe(500);
// expect(resposta.body).toEqual({ message: 'Erro ao buscar acomodações no banco de dados.' });

//   });
// });

// //npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/controllers/test.filterController.spec.ts