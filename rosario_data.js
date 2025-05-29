// Dados do Rosário (v2)

const oracoes = {
  sinal_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  credo: "Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos Santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.",
  pai_nosso: "Pai Nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  ave_maria: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
  gloria: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  oracao_fatima: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o Céu, principalmente as que mais precisarem da Vossa misericórdia.",
  salve_rainha: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
  oracao_final: "Ó Deus, cujo Filho Unigênito, por sua vida, morte e ressurreição, nos alcançou o prêmio da salvação eterna, concedei-nos, Vo-lo pedimos, que, meditando estes mistérios do Santíssimo Rosário da Bem-Aventurada Virgem Maria, imitemos o que eles contêm e obtenhamos o que prometem. Pelo mesmo Cristo, Senhor Nosso. Amém.",
  oferecimento: "Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção."
};

const misterios = {
  gozosos: {
    nome: "Mistérios Gozosos",
    dias: [1, 6], // Seg, Sab
    lista: [
      "A Anunciação do Anjo a Maria",
      "A Visitação de Maria a Santa Isabel",
      "O Nascimento de Jesus em Belém",
      "A Apresentação de Jesus no Templo",
      "A Perda e o Encontro de Jesus no Templo"
    ]
  },
  luminosos: {
    nome: "Mistérios Luminosos",
    dias: [4], // Qui
    lista: [
      "O Batismo de Jesus no Rio Jordão",
      "A Auto-revelação de Jesus nas Bodas de Caná",
      "O Anúncio do Reino de Deus e o convite à conversão",
      "A Transfiguração de Jesus no Monte Tabor",
      "A Instituição da Eucaristia"
    ]
  },
  dolorosos: {
    nome: "Mistérios Dolorosos",
    dias: [2, 5], // Ter, Sex
    lista: [
      "A Agonia de Jesus no Horto das Oliveiras",
      "A Flagelação de Jesus atado à coluna",
      "A Coroação de espinhos de Jesus",
      "Jesus carregando a cruz no caminho do Calvário",
      "A Crucificação e Morte de Jesus"
    ]
  },
  gloriosos: {
    nome: "Mistérios Gloriosos",
    dias: [3, 0], // Qua, Dom
    lista: [
      "A Ressurreição de Jesus",
      "A Ascensão de Jesus ao Céu",
      "A Vinda do Espírito Santo sobre os Apóstolos",
      "A Assunção de Maria ao Céu",
      "A Coroação de Maria como Rainha do Céu e da Terra"
    ]
  }
};

function getMisteriosDoDiaKey() {
  const diaSemana = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  for (const key in misterios) {
    if (misterios[key].dias.includes(diaSemana)) {
      return key;
    }
  }
  return 'gozosos'; // Padrão
}

// Função para gerar a sequência de orações dinamicamente
function gerarSequencia(tiposMisterio) { // tiposMisterio é um array de keys, ex: ['gozosos'] ou ['gozosos', 'luminosos', ...] 
  let sequencia = [];
  let passoGlobal = 0;

  // Orações Iniciais
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "sinal_cruz", texto_aux: "Iniciar" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "oferecimento", texto_aux: "Oferecimento" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "credo", texto_aux: "Creio (no Crucifixo)" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "pai_nosso", texto_aux: "Pai Nosso (1ª conta grande)" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "ave_maria", texto_aux: "Ave Maria (1ª conta pequena - Fé)", conta_ave: 1 });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "ave_maria", texto_aux: "Ave Maria (2ª conta pequena - Esperança)", conta_ave: 2 });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "ave_maria", texto_aux: "Ave Maria (3ª conta pequena - Caridade)", conta_ave: 3 });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "inicio", oracao: "gloria", texto_aux: "Glória (antes da 1ª dezena)" });

  // Dezenas (Mistérios)
  tiposMisterio.forEach((tipoMisterioKey, tercoIdx) => {
    const misteriosAtuais = misterios[tipoMisterioKey].lista;
    misteriosAtuais.forEach((misterioTexto, misterioIdx) => {
      // Anunciar Mistério
      sequencia.push({ passoGlobal: passoGlobal++, tipo: "misterio_anuncio", misterio_idx: misterioIdx, terco_idx: tercoIdx, tipo_misterio: tipoMisterioKey, texto_aux: `Anunciar ${misterioIdx + 1}º Mistério (${misterios[tipoMisterioKey].nome})` });
      // Pai Nosso
      sequencia.push({ passoGlobal: passoGlobal++, tipo: "dezena", oracao: "pai_nosso", misterio_idx: misterioIdx, terco_idx: tercoIdx, tipo_misterio: tipoMisterioKey, conta_ave: 0, texto_aux: "Pai Nosso (conta grande)" });
      // 10 Ave Marias
      for (let i = 1; i <= 10; i++) {
        sequencia.push({ passoGlobal: passoGlobal++, tipo: "dezena", oracao: "ave_maria", misterio_idx: misterioIdx, terco_idx: tercoIdx, tipo_misterio: tipoMisterioKey, conta_ave: i, texto_aux: `${i}ª Ave Maria` });
      }
      // Glória
      sequencia.push({ passoGlobal: passoGlobal++, tipo: "dezena", oracao: "gloria", misterio_idx: misterioIdx, terco_idx: tercoIdx, tipo_misterio: tipoMisterioKey, conta_ave: 11, texto_aux: "Glória" });
      // Oração de Fátima
      sequencia.push({ passoGlobal: passoGlobal++, tipo: "dezena", oracao: "oracao_fatima", misterio_idx: misterioIdx, terco_idx: tercoIdx, tipo_misterio: tipoMisterioKey, conta_ave: 12, texto_aux: "Ó Meu Jesus" });
    });
  });

  // Orações Finais
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "final", oracao: "salve_rainha", texto_aux: "Agradecimento / Salve Rainha" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "final", oracao: "oracao_final", texto_aux: "Oração Final" });
  sequencia.push({ passoGlobal: passoGlobal++, tipo: "final", oracao: "sinal_cruz", texto_aux: "Sinal da Cruz Final" });

  return sequencia;
}

