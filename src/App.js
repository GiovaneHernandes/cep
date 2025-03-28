import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const App = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data.slice(0, 5)));
  }, []);

  const buscarCep = () => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => setEndereco(res.data));
  };

  return (
    <div className="container">
      <div className="containerCep">
        <h1>FORMULARIO</h1>

        <input
          placeholder="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={buscarCep}
        />
        <input
          placeholder="Logradouro"
          type="text"
          value={endereco.logradouro || ""}
          readOnly
        />
        <input
          placeholder="Bairro"
          type="text"
          value={endereco.bairro || ""}
          readOnly
        />
        <input
          placeholder="Localidade"
          type="text"
          value={endereco.localidade || ""}
          readOnly
        />
        <input
          placeholder="Uf"
          type="text"
          value={endereco.uf || ""}
          readOnly
        />
      </div>
      <div className="containerBlog">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <img
              src={`https://via.placeholder.com/150?text=Post+${post.id}`}
            ></img>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
