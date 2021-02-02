import React, { useEffect, useState } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio 1 react ${Date.now()}`,
      url: "http://thiagodev.com",
      techs: "javascript",
    })
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {


    await api.delete(`repositories/${id}`);
    const filterRepo = repositories.filter(repository => repository.id !== id)
    setRepositories(filterRepo);


  }

  // TODO
  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button type='button' onClick={() => handleRemoveRepository(repository.id)}>Remover</button>

          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
