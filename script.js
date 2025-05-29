document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos DOM ---
    const selecaoModoEl = document.getElementById('selecao-modo');
    const selecaoMisterioTercoEl = document.getElementById('selecao-misterio-terco');
    const oracaoContainerEl = document.getElementById('oracao-container');
    const misterioAtualEl = document.getElementById('misterio-atual');
    const progressoContainerEl = document.getElementById('progresso-container');
    const oracaoTextoEl = document.getElementById('oracao-texto');
    const oracaoInfoEl = document.getElementById('oracao-info');
    const controleToqueEl = document.getElementById('controle-toque');
    const btnTerco = document.getElementById('btn-terco');
    const btnRosario = document.getElementById('btn-rosario');

    // --- Estado da Aplicação ---
    let estado = {
        passoAtualGlobal: 0,
        sequenciaAtual: [],
        tiposMisterioSelecionados: [], // Array de keys, ex: ['gozosos'] ou ['gozosos', 'luminosos', ...]
        modo: null // 'terco' ou 'rosario'
    };

    // --- Funções ---

    // Cria as barras de progresso visualmente
    function criarBarrasProgresso() {
        progressoContainerEl.innerHTML = ''; // Limpa barras anteriores
        estado.tiposMisterioSelecionados.forEach((tipoMisterioKey, tercoIdx) => {
            const barraTerco = document.createElement('div');
            barraTerco.classList.add('barra-terco');
            barraTerco.dataset.tercoIndex = tercoIdx;
            barraTerco.dataset.tipoMisterio = tipoMisterioKey;

            for (let i = 0; i < 5; i++) { // 5 Mistérios
                const misterioProgresso = document.createElement('div');
                misterioProgresso.classList.add('misterio-progresso');
                misterioProgresso.dataset.misterioIndex = i;

                for (let j = 0; j < 10; j++) { // 10 Ave Marias
                    const aveMariaProgresso = document.createElement('div');
                    aveMariaProgresso.classList.add('ave-maria-progresso');
                    aveMariaProgresso.dataset.aveMariaIndex = j;
                    misterioProgresso.appendChild(aveMariaProgresso);
                }
                barraTerco.appendChild(misterioProgresso);
            }
            progressoContainerEl.appendChild(barraTerco);
        });
    }

    // Atualiza a UI com a oração e informações atuais
    function atualizarUI() {
        const passoData = estado.sequenciaAtual[estado.passoAtualGlobal];

        if (!passoData) {
            oracaoTextoEl.textContent = "Fim!";
            oracaoInfoEl.textContent = "Toque para voltar ao início.";
            misterioAtualEl.textContent = "Concluído";
            // Marcar todas as barras como completas (opcional)
            return;
        }

        let textoOracao = oracoes[passoData.oracao] || "";
        let textoInfo = passoData.texto_aux || "";
        let textoMisterioPrincipal = "";

        // Define o texto do mistério principal e a oração/info
        if (passoData.tipo === 'inicio') {
            textoMisterioPrincipal = "Orações Iniciais";
        } else if (passoData.tipo === 'misterio_anuncio') {
            textoMisterioPrincipal = misterios[passoData.tipo_misterio].nome;
            textoOracao = `Anunciando o ${passoData.misterio_idx + 1}º Mistério:\n\n${misterios[passoData.tipo_misterio].lista[passoData.misterio_idx]}`;
            textoInfo = "Reflita e reze o Pai Nosso a seguir.";
        } else if (passoData.tipo === 'dezena') {
            textoMisterioPrincipal = `${passoData.misterio_idx + 1}º Mistério: ${misterios[passoData.tipo_misterio].lista[passoData.misterio_idx]}`;
            // A informação já vem formatada de gerarSequencia (ex: '1ª Ave Maria')
        } else if (passoData.tipo === 'final') {
            textoMisterioPrincipal = "Orações Finais";
        }

        oracaoTextoEl.textContent = textoOracao;
        oracaoInfoEl.textContent = textoInfo; // Usar o texto_aux diretamente
        misterioAtualEl.textContent = textoMisterioPrincipal;

        // Atualiza o progresso visual
        atualizarProgressoVisual(passoData);
    }

    // Atualiza as barras de progresso visualmente
    function atualizarProgressoVisual(passoData) {
        if (passoData.tipo === 'dezena' && passoData.oracao === 'ave_maria') {
            const tercoIdx = passoData.terco_idx;
            const misterioIdx = passoData.misterio_idx;
            const aveMariaIdx = passoData.conta_ave - 1; // conta_ave é 1-based

            const barraTarget = progressoContainerEl.querySelector(`.barra-terco[data-terco-index="${tercoIdx}"]`);
            if (barraTarget) {
                const misterioTarget = barraTarget.querySelector(`.misterio-progresso[data-misterio-index="${misterioIdx}"]`);
                if (misterioTarget) {
                    const aveMariaTarget = misterioTarget.querySelector(`.ave-maria-progresso[data-ave-maria-index="${aveMariaIdx}"]`);
                    if (aveMariaTarget) {
                        aveMariaTarget.classList.add('ave-maria-completa');
                    }
                }
            }
        }
        // Poderia adicionar lógica para 'despintar' ao reiniciar ou voltar
    }

    // Avança para o próximo passo
    function avancarPasso() {
        if (estado.passoAtualGlobal >= estado.sequenciaAtual.length - 1) {
            // Voltar para a tela de seleção
            mostrarTelaSelecao();
        } else {
            estado.passoAtualGlobal++;
            atualizarUI();
        }
    }

    // Mostra a tela de oração e esconde a de seleção
    function mostrarTelaOracao() {
        selecaoModoEl.classList.remove('visible');
        selecaoModoEl.classList.add('hidden');
        oracaoContainerEl.classList.remove('hidden');
        oracaoContainerEl.classList.add('visible');
    }

    // Mostra a tela de seleção e esconde a de oração
    function mostrarTelaSelecao() {
        oracaoContainerEl.classList.remove('visible');
        oracaoContainerEl.classList.add('hidden');
        selecaoMisterioTercoEl.classList.add('hidden'); // Garante que a seleção de mistério esteja escondida
        selecaoModoEl.classList.remove('hidden');
        selecaoModoEl.classList.add('visible');
        // Resetar estado para nova seleção
        estado.passoAtualGlobal = 0;
        estado.sequenciaAtual = [];
        estado.tiposMisterioSelecionados = [];
        estado.modo = null;
        progressoContainerEl.innerHTML = ''; // Limpa barras
    }

    // Inicia a oração com base na seleção
    function iniciarOracao(tiposMisterio) {
        estado.tiposMisterioSelecionados = tiposMisterio;
        estado.sequenciaAtual = gerarSequencia(estado.tiposMisterioSelecionados);
        estado.passoAtualGlobal = 0;
        criarBarrasProgresso();
        atualizarUI();
        mostrarTelaOracao();
    }

    // --- Event Listeners ---
    btnTerco.addEventListener('click', () => {
        estado.modo = 'terco';
        selecaoMisterioTercoEl.classList.remove('hidden');
        // Não inicia ainda, espera a seleção do mistério
    });

    btnRosario.addEventListener('click', () => {
        estado.modo = 'rosario';
        selecaoMisterioTercoEl.classList.add('hidden');
        iniciarOracao(['gozosos', 'luminosos', 'dolorosos', 'gloriosos']);
    });

    selecaoMisterioTercoEl.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.misterio) {
            const tipoMisterio = event.target.dataset.misterio;
            iniciarOracao([tipoMisterio]);
        }
    });

    controleToqueEl.addEventListener('click', avancarPasso);

    // --- Inicialização ---
    mostrarTelaSelecao(); // Começa na tela de seleção

});
