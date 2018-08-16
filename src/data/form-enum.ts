import {FormEnum} from "../models/form-enum"

export const TipoDeclarante: FormEnum[] = [
  {key: "condutor", value: "Condutor"},
  {key: "corretor", value: "Corretor"},
  {key: "proprietario", value: "Proprietário"},
  {key: "passageiro", value: "Passageiro"},
  {key: "condutor_e_proprietario", value: "Condutor e proprietário"},
  {key: "terceiro_atingido", value: "Terceiro atingido"},
]

export const SituacaoVeiculo: FormEnum[] = [
  {key: "licenciado_para", value: "Licenciado no Pará"},
  {key: "licenciado_outro_estado", value: "Licenciado em outro Estado"},
  {key: "nao_licenciado", value: "Não licenciado"},
  {key: "dispensado_registro", value: "Dispensado de Registro"},
]

export const DocumentosDeclarante: FormEnum[] = [
  {key: "passaporte", value: "Passaporte"},
  {key: "rg", value: "RNE"},
  {key: "outro", value: "Outro"}
]

export const TipoAcidente: FormEnum[] = [
  {key: "atropelamento_de_animal", value: "Atropelamento de animal"},
  {key: "colisao_transversal", value: "Colisão transversal"},
  {key: "saida_de_pista", value: "Saída de pista"},
  {key: "colisao_com_objeto_estatico", value: "Colisão com objeto estático"},
  {key: "tombamento", value: "Tombamento"},
  {key: "colisao_lateral", value: "Colisão lateral"},
  {key: "colisao_com_objeto_movel", value: "Colisão com objeto móvel"},
  {key: "engavetamento", value: "Engavetamento"},
  {key: "colisao_traseira", value: "Colisão traseira"},
  {key: "colisao_frontal", value: "Colisão frontal"},
  {key: "derramamento_de_carga", value: "Derramamento de carga"},
  {key: "danos_eventuais", value: "Danos eventuais"},



]
export const CondicoesPista: FormEnum[] = [
  {key: "bom", value: "Bom"},
  {key: "regular", value: "Regular"},
  {key: "ruim", value: "Ruim"},  
]

export const TracadoRodovia: FormEnum[] = [
   {key: "reta", value: "Reta"},
  {key: "curva", value: "Curva"},
  {key: "cruzamento", value: "Cruzamento"}, 
  {key: "rotatoria", value: "Rotatória"},
  {key: "elevador", value: "Elevador"},
]

export const VeiculosCategoria: FormEnum[] = [
  {key: "aprendizagem", value: "Aprendizagem"},
  {key: "diplomatico", value: "Diplomático"},
  {key: "aluguel", value: "Aluguel"},
  {key: "experiencia", value: "Experiência"},
  {key: "colecao", value: "Coleção"},
  {key: "particular", value: "Particular"},
  {key: "oficial", value: "Oficial"}
]
export const VeiculosTipo: FormEnum[] = [
  {key: "automovel", value: "Automóvel"},
  {key: "bicicleta", value: "Bicicleta"},
  {key: "bonde", value: "Bonde"},
  {key: "caminhao", value: "Caminhão"},
  {key: "caminhao_trator", value: "Caminhão-trator"},
  {key: "caminhonete", value: "Caminhonete"},
  {key: "camioneta", value: "Camioneta"},
  {key: "carroça", value: "Carroça"},
  {key: "charrete", value: "Charrete"},
  {key: "ciclomotor", value: "Ciclomotor"},
  {key: "competicao", value: "Competição"},
  {key: "especial", value: "Especial"},
  {key: "microonibus", value: "Microônibus"},
  {key: "motocicleta", value: "Motocicleta"},
  {key: "motoneta", value: "Motoneta"},
  {key: "onibus", value: "Ônibus"},
  {key: "outros", value: "Outros"},
  {key: "quadriciclo", value: "Quadriciclo"},
  {key: "reboque_ou_semireboque", value: "Reboque ou Semireboque"},
  {key: "trator_de_esteiras", value: "Trator de esteiras"},
  {key: "trator_de_rodas", value: "Trator de rodas"},
  {key: "trator_misto", value: "Trator misto"},  
  {key: "triciclo", value: "Triciclo"},
  {key: "utilitario", value: "Utilitário"},
]

export const OpcoesSeguradora: FormEnum[] = [
  {key: "sim", value: "Sim"},
  {key: "nao_sei", value: "Não sei"},
  {key: "nao", value: "Não"},
]

export const Manobras: FormEnum[] = [
  {key: "estava_na_contramao", value: "Estava na contramão"},
  {key: "cruzava_a_via", value: "Cruzava a via"},
  {key: "entrava_na_via", value: "Entrava na via"},
  {key: "estava_estacionado", value: "Estava estacionado"},
  {key: "estava_em_marcha_re", value: "Estava em marcha ré"},
  {key: "mudava_de_faixa", value: "Mudava de faixa"},
  {key: "estava_parado_na_via", value: "Estava parado na via"},
  {key: "estava_parado_no_acostamento", value: "Estava parado no acostamento"},
  {key: "estava_efetuando_retorno", value: "Estava efetuando retorno"},
  {key: "estava_saindo_da_via", value: "Estava saindo da via"},
  {key: "seguia_o_fluxo", value: "Seguia o fluxo"},
  {key: "estava_ultrapassando", value: "Estava ultrapassando"},
  {key: "virava_a_direita", value: "Virava à direita"},
  {key: "virava_a_esquerda", value: "Virava à esquerda"},
]

export const OpcoesReboque: FormEnum[] = [
  {key: "um", value: "1 (Um)"},
  {key: "dois", value: "2 (Dois)"},
  {key: "nao", value: "Não"},

]

export const CnhCategoria: FormEnum[] = [
  {key: "A", value: "A"},
  {key: "B", value: "B"},
  {key: "C", value: "C"},
  {key: "D", value: "D"},
  {key: "E", value: "E"},
  {key: "AB", value: "AB"},
  {key: "AC", value: "AC"},
  {key: "AD", value: "AD"},
  {key: "AE", value: "AE"}
]

export const DanoCargaEstimativa: FormEnum[] = [
  {key: "vinte_e_cinto_porcento", value: "25%"},
  {key: "cinquenta_porcento", value: "50%"},
  {key: "setenta_e_cinto_porcento", value: "75%"},
  {key: "total", value: "Total"}
]

export const CondicaoSinalizacao: FormEnum[] = [
  {key: "bom", value: "Bom"},
  {key: "regular", value: "Regular"},
  {key: "ruim", value: "Ruim"},  
]

export const CondicoesMeteorologicas: FormEnum[] = [
  {key: "chuva", value: "Chuva"},
  {key: "ceu_claro", value: "Céu claro"},
  {key: "neve", value: "Neve"},
  {key: "nublado", value: "Nublado"},
  {key: "granizo", value: "Granizo"},  
  {key: "nevoeiro", value: "Nevoeiro"},
  
]
