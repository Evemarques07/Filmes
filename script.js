document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formulario");
    const filmeInput = document.querySelector("#filme");
    const sectionCards = document.querySelector("#cards");
    const botao_VerMais = document.querySelector(".VerMais");

    const error = document.createElement("p");

    async function buscarFilme(url) {
        try {
            const request = await fetch(url);
            const response = await request.json();
            console.log(response);
            if (response.error || response.results.length === 0) { 
                error.textContent = "filme não encontrado";
            } else {
                error.textContent = "";
                response.results.forEach((filme) => {
                    const card = criarCard(filme);
                    sectionCards.appendChild(card);
                });
                if (response.next) {
                    botao_VerMais.style.display = "block";
                    botao_VerMais.id = response.next;
                } else {
                    botao_VerMais.style.display = "none";
                }
            }
            filmeInput.value = "";
            filmeInput.focus();
        } catch (error) {
            console.log(error);
        }
    }

    function criarCard(filme) {
        const card = document.createElement("div");
        card.classList.add("card");
        const img_sec = document.querySelector("#cards")

        const img_post = document.createElement("img");
        img_post.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
        img_post.alt = filme.title;
        img_post.width = "300";
        img_post.height = "320";


        img_sec.append(img_post);

        card.append(img_post,  error);
        
        return card;
    }

    botao_VerMais.addEventListener("click", function(e) {
        const px_pagina = e.target.id;
        if (px_pagina) {
            buscarFilme(`https://api.themoviedb.org/3/movie/popular?api_key=28c59058726504261aeccd6ee8a2ad75&language=pt-BR&page=${px_pagina}`);
        }
    });

    formulario.addEventListener("submit", function(e) {
        e.preventDefault();
        sectionCards.innerHTML = "";
        if (filmeInput.value.trim() !== "") {
            buscarFilme(`https://api.themoviedb.org/3/search/movie?api_key=28c59058726504261aeccd6ee8a2ad75&language=pt-BR&query=${filmeInput.value}`);
        }
    });
});
