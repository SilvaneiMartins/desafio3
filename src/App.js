/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Desafio 03: Conceitos do ReactJS;
*/
import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
   const [repositories, setRepositories] = useState([]);

   useEffect(() => {
      api.get('/repositories').then(response => {
         setRepositories(response.data);
      })
   }, []);

   async function handleAddRepository() {
      const reponse = await api.post('/repositories', {
         title: `novo repository ${Date.now()}`,
         url: "http://github.com",
         techs: ["Node.js", "React.js"]
      });
      setRepositories([...repositories, reponse.data]);
   }

   /**
   * @param int id 
   */
   async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`);
      const repositoryIndex = repositories
         .findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
   }

   return (
      <div>
         <ul data-testid="repository-list">
            {
               repositories.map(repository => (
                  <li key={repository.id}>
                     {repository.title}
                     <button onClick={() => handleRemoveRepository(repository.id)}>
                        Remover
                     </button>
                  </li>
               ))
            }
         </ul>

         <button onClick={handleAddRepository}>Adicionar</button>
      </div>
   );
}

export default App;
