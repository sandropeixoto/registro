export default [
  {
    question: 'Você é maior de 18 anos ou emancipado civilmente?',
    errorMessage: 'Somente pessoas emancipadas ou maiores de 18 anos podem realizar a declaração do acidente.',
    selectedValue: true, validValue: true
  },
  {
    question: 'Este acidente ocorreu dentro do Município de Belém-PA?',
    errorMessage: 'O DETRAN/PA registra acidentes ocorridos' +
    ' no município de Belém. Por favor, procure o órgão responsável pela via onde ocorreu o acidente.',
    selectedValue: true, validValue: true
  },
  {
    question: 'O acidente aconteceu há mais de 30(trinta) dias corridos?',
    errorMessage: 'Este boletim não pode ser feito eletronicamente. Disque 190 e acione o CIOP.',
    selectedValue: false, validValue: false
  },
  {
    question: 'Alguém feriu-se, ainda que levemente, nesse acidente?',
    errorMessage: 'Este boletim não pode ser feito eletronicamente. Disque 190 e acione o CIOP.',
    selectedValue: false, validValue: false
  },
  {
    question: 'O acidente envolveu mais de 5(cinco) veículos?',
    errorMessage: 'Este boletim não pode ser feito eletronicamente. Disque 190 e acione o CIOP.',
    selectedValue: false, validValue: false
  },
  {
    question: 'O acidente envolveu veículo de transporte de produtos perigosos, \
      do qual houve avaria ao compartimento de carga a granel, derramamento ou \
      vazamento do produto?',
    errorMessage: 'Este boletim não pode ser feito eletronicamente. Disque 190 e acione o CIOP.',
    selectedValue: false, validValue: false
  }
]
