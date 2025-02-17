import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/findReservation.repository';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';
import FilterService from '../services/filter.service';

export const filtrarAcomodacoes = async (req: Request, res: Response) => {
    try {
        const { destino, data_ida, data_volta, num_pessoas, ...filtros } = req.query;
        console.log("Parâmetros recebidos:", req.query);

        if (!destino) {
            return res.status(400).json({ message: 'Parâmetros obrigatórios ausentes.' });
        }

        const checkInDate = data_ida ? parseISO(data_ida as string) : addDays(new Date(), 1);
        const checkOutDate = data_volta ? parseISO(data_volta as string) : addDays(new Date(), 2);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            return res.status(400).json({ message: 'Datas inválidas fornecidas.' });
        }

        const numHospedes = Number(num_pessoas) || 2;

        const roomService = new RoomService(new RoomRepository());
        let roomsAdequados;

        try {
            roomsAdequados = await roomService.buscarAcomodacoes(destino as string, checkInDate, checkOutDate, numHospedes);
            console.log("Acomodações encontradas:", roomsAdequados);
        } catch (error) {
            console.error('Erro ao buscar acomodações:', error);
            return res.status(500).json({ message: 'Erro ao buscar acomodações no banco de dados.' });
        }

        if (!roomsAdequados || (Array.isArray(roomsAdequados) && roomsAdequados.length === 0)) {
            return res.status(200).json({ message: 'Nenhuma acomodação atende aos filtros selecionados.' });
        }
        
        if (!Array.isArray(roomsAdequados)) {
            return res.status(500).json({ message: 'nao tem acomod Erro ao processar acomodações.' });
        }

        const quartosFiltrados = FilterService.filtrarAcomodacoes(roomsAdequados, filtros);

        if (quartosFiltrados.length === 0) {
            return res.status(404).json({ message: 'Nenhuma acomodação atende aos filtros selecionados.' });
        }

        console.log("Acomodações antes do filtro:", roomsAdequados);
        console.log("Filtros aplicados:", filtros);


        return res.status(200).json(quartosFiltrados);

    } catch (error: any) { 
        console.error('Erro no servidor:', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
