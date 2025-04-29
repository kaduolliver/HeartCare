/* ******Função com switch case para exibir o conteúdo da tabela "usuário"****** */

//imports para o switch-case da função showContent
import { carregarPerfil } from './sections/perfil.js';
import { carregarDadosPessoais } from './sections/dadosPessoais.js';
import { carregarMarcarConsultas } from './sections/marcarConsulta.js';
import { carregarConsultasAgendadas } from './sections/consultasAgendadas.js';
import { carregarExames } from './sections/exames.js';


export function showContent(section, button) {
    const contentArea = document.getElementById('content-area');
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    switch (section) {
        case 'perfil':
            carregarPerfil(contentArea);
            break;

        case 'dados':
            carregarDadosPessoais(contentArea);
            break;

        case 'marcar':
            carregarMarcarConsultas(contentArea);
            break;

        case 'agendadas':
            carregarConsultasAgendadas(contentArea);
            break;

        case 'exames':
            carregarExames(contentArea);
            break;

        default:
            contentArea.innerHTML = `<h2>Bem-vindo</h2><p>Selecione uma opcao do menu a esquerda.</p>`;
    }
}