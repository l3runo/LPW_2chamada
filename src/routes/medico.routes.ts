import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateMedicoService from '../services/CreateMedicoService'
import {getRepository} from 'typeorm'
import multer from 'multer';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import Medico from '../models/Medico';

const medicoRouter = Router(); // define uma variavel para inicializar o router
const upload = multer(uploadConfig); // Define a variavel que vai inicializar o multer passando como parametro a upload config
const createMedico = new CreateMedicoService(); 

medicoRouter.post('/', upload.single('image'), async(request : Request, response : Response) => { 
        const {name, data_nasc, grau_parentesco, funcionario_id} = request.body;
        const photo = `http://localhost/files/${request.file.filename}`; // MUDAR CONFORME O PC
        const medico = await createMedico.execute({name, data_nasc, grau_parentesco, funcionario_id, photo}); 
        return response.json(medico);
});

medicoRouter.get('/', async (request: Request, response: Response) => { 
    const medicoRepository = getRepository(Medico);
    const medico = await medicoRepository.find(); 
    return response.json(medico); // retorna um json com o resultado obtido.
});

medicoRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const medicoRepository = getRepository(Medico);
    const medico = await medicoRepository.findOne( { id });

    return response.json(medico);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o medico)', 404);
    }
});

medicoRouter.get('/funcionario/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const medicoRepository = getRepository(Medico);
    // const medico = await medicoRepository.find( { funcionario_id : id })
    // const med = medico.map(med => ({name: med.name, data_nasc: med.data_nasc, grau_parentesco: med.grau_parentesco, photo: med.photo}));
    return response.json(med);

    
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o medico)', 404);
    }
});

//ALTERAR medico
medicoRouter.patch('/:id', upload.single('image'), async(request: Request, response: Response) => { 
    try {
            const { id } = request.params;
            const medicoRepository = getRepository(Medico);
            const medico = await medicoRepository.findOne({ id });
     
            // const {name, data_nasc, funcionario_id, grau_parentesco} = request.body;
            const photo = `http://localhost:3333/files/${request.file.filename}`;
    
            // medico.name = name;
            // medico.funcionario_id = funcionario_id;
            // medico.data_nasc = data_nasc;
            // medico.grau_parentesco = grau_parentesco;
            // medico.photo = photo;
    
            await medicoRepository.save(medico); // Salva no banco de dados     
            return response.json(medico);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o medico)', 404);
    }
    
});


//ROTA DE DELETAR

medicoRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const medicoRepository = getRepository(Medico);
    const medico = await medicoRepository.findOne({ id });
    medicoRepository.remove(medico);

    response.json({ok: true});
});
export default medicoRouter; // exporta a variavel