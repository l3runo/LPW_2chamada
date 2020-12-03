import { Router, Response, Request } from 'express'; 
import CreateFuncionarioService from '../services/CreatePacienteService';
import {getRepository} from 'typeorm'
import Funcionario from '../models/Paciente';
import uploadConfig from '../config/upload';
import multer from 'multer';
import AppError from '../errors/AppError';
const pacientesRouter = Router(); // Define a variavel que vai inicializar o router.
const upload = multer(uploadConfig);

const funcionarioService = new CreateFuncionarioService();

pacientesRouter.post('/', upload.single('image') ,async (request, response) => {
        const {name, functionn, department, email, phone} = request.body;
        const photo = `http://localhost:3333/files/${request.file.filename}`;
        const funcionario = await funcionarioService.execute({name, functionn, department, email, phone, photo}); // passa name, email and  password para função execute do service.
        
        return response.json(paciente);
});

pacientesRouter.get('/', async (request, response) => {
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.find();

        return response.json(funcionario);
});

pacientesRouter.get('/:id', async (request, response) => {
        try {
        const {id} = request.params;
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.findOne( { id });

        return response.json(
                { 
                name: funcionario.name, 
                department: funcionario.department, 
                email: funcionario.email, 
                phone: funcionario.phone
        });
        }
        catch(err) {
                throw new AppError('Não foi possivel localizar o funcionario)', 404);
        }
});

//DELETAR
pacientesRouter.delete('/:id', async(request: Request, response: Response) => {
        try {

        
        const {id} = request.params;
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.findOne({ id });
        funcionariosRepository.remove(funcionario);
    
        response.json({ok: true});
        }
        catch(err) {
                throw new AppError('Não foi possivel deletar o funcionario, favor rever o id)', 400);
        }
});

//ALTERAR
pacientesRouter.patch('/:id', upload.single('image'), async(request: Request, response: Response) => { 
        try {
                const { id } = request.params;
                const funcionariosRepository = getRepository(Funcionario);
                const funcionario = await funcionariosRepository.findOne({ id });
         
                const {name, functionn, department, email, phone} = request.body;
                const photo = `http://localhost:3333/files/${request.file.filename}`;
        
                funcionario.name = name;
                funcionario.function = functionn;
                funcionario.department = department;
                funcionario.email = email;
                funcionario.phone = phone;
                funcionario.photo = photo;
        
                await funcionariosRepository.save(funcionario); // Salva no banco de dados     
                return response.json(funcionario);
        }
        catch(err) {
                throw new AppError('Não foi possivel localizar o funcionario)', 404);
        }
        
});

export default pacientesRouter;
