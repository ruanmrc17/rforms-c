import React, { useState } from 'react';
import '../styles/RelatorioPlantao.css';

export default function RelatorioPlantao() {
  const [data, setData] = useState({
    nome: '',
    matricula: '',
    dataInicio: '',
    horaInicio: '',
    dataSaida: '',
    horaSaida: '',
    objetos: {},
    patrulhamento: {}, // cada distrito com primeiro e ultimo nome
    observacoes: '',
    fotos: null,
    videos: null,
  });

  const objetosList = [
    '15 Cones',
    '20 Cones',
    '25 Cones',
    '30 Cones',
    '39 Cones',
    'Celular',
    'Carregador do celular',
    'Outros / tirar foto',
    'Nenhuma das opções',
  ];

  const patrulhamentoList = [
    'Distrito Boca da Mata',
    'Povoado Olhos d’Água',
    'Distrito Santo Antônio',
    'Distrito Olhos d’Água',
    'Vila José Paulino',
    'Centro',
    'Usina Brasileira',
    'Povoado Sapucaia',
    'Povoado Boa Fé',
    'Distrito Branca de Atalaia',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setData(prev => ({
        ...prev,
        objetos: { ...prev.objetos, [name]: checked },
      }));
    } else if (type === 'file') {
      setData(prev => ({
        ...prev,
        [name]: files,
      }));
    } else if (type === 'text' && name.startsWith('patrulhamento')) {
      // name ex: patrulhamento-Distrito Boca da Mata-primeiro
      const [, distrito, field] = name.split('-');
      setData(prev => ({
        ...prev,
        patrulhamento: {
          ...prev.patrulhamento,
          [distrito]: {
            ...prev.patrulhamento[distrito],
            [field]: value,
          }
        }
      }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', data);
    alert('Relatório enviado — veja o console!');
  };

  return (
    <div className="form-container">
      <h2>Relatório de Plantão</h2>
      <form onSubmit={handleSubmit} className="form-base">
        <div className="field-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={data.nome} onChange={handleChange} required />
        </div>

        <div className="field-group">
          <label>Matrícula:</label>
          <input type="text" name="matricula" value={data.matricula} onChange={handleChange} required />
        </div>

        <div className="field-group">
          <label>Data Início:</label>
          <input type="date" name="dataInicio" value={data.dataInicio} onChange={handleChange} required />
          <label>Hora Início:</label>
          <input type="time" name="horaInicio" value={data.horaInicio} onChange={handleChange} required />
        </div>

        <div className="field-group">
          <label>Data Saída:</label>
          <input type="date" name="dataSaida" value={data.dataSaida} onChange={handleChange} required />
          <label>Hora Saída:</label>
          <input type="time" name="horaSaida" value={data.horaSaida} onChange={handleChange} required />
        </div>

        <fieldset className="checkbox-group">
          <legend>Objetos encontrados na base:</legend>
          {objetosList.map(item => (
            <label key={item}>
              <input type="checkbox" name={item} checked={!!data.objetos[item]} onChange={handleChange} />
              {item}
            </label>
          ))}
        </fieldset>

        <fieldset className="radio-group">
          <legend>Patrulhamento Preventivo:</legend>
          {patrulhamentoList.map((item) => (
            <div key={item} className="patrulhamento-item">
              <strong>{item}</strong>
              <input
                type="text"
                name={`patrulhamento-${item}-primeiro`}
                placeholder="Primeiro nome"
                value={data.patrulhamento[item]?.primeiro || ''}
                onChange={handleChange}
              />
              <input
                type="text"
                name={`patrulhamento-${item}-ultimo`}
                placeholder="Último nome"
                value={data.patrulhamento[item]?.ultimo || ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </fieldset>

        <fieldset className="observacoes-group">
          <legend>Observações:</legend>
          <textarea
            name="observacoes"
            placeholder="Escreva suas observações aqui"
            value={data.observacoes}
            onChange={handleChange}
            rows={4}
          />
          <legend>Importar Fotos</legend>
          <input
            type="file"
            name="fotos"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          <legend>Importar Vídeos</legend>
          <input
            type="file"
            name="videos"
            accept="video/*"
            multiple
            onChange={handleChange}
          />
        </fieldset>

        <button type="submit" className="form-button">Enviar Relatório</button>
      </form>
    </div>
  );
}
