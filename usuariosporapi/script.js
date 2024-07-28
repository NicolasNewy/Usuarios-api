async function buscarUsuarios() {
    let resposta = await fetch('https://dummyjson.com/users?limit=100');
    let dados = await resposta.json();
    let usuarios = dados.users;

    let usuariosOrganizados = organizarUsuariosPorEstado(usuarios);
    exibirUsuarios(usuariosOrganizados);
}

function organizarUsuariosPorEstado(usuarios) {
    let usuariosPorEstado = {};

    usuarios.forEach(function(usuario) {
        let estado = usuario.address.state;
        if (!usuariosPorEstado[estado]) {
            usuariosPorEstado[estado] = [];
        }
        usuariosPorEstado[estado].push(usuario);
    });    

    Object.keys(usuariosPorEstado).forEach(estado => {
        usuariosPorEstado[estado].sort((a, b) => a.firstName.localeCompare(b.firstName));
    });

    return usuariosPorEstado;
}

function exibirUsuarios(usuariosPorEstado) {
    let container = document.getElementById('base-usuarios');

    Object.keys(usuariosPorEstado).forEach(estado => {
        let cabecalhoEstado = document.createElement('h2');
        cabecalhoEstado.textContent = estado;
        container.appendChild(cabecalhoEstado);

        let listaUsuarios = document.createElement('ul');
        usuariosPorEstado[estado].forEach(usuario => {
            let itemUsuario = document.createElement('li');
            itemUsuario.textContent = `${usuario.firstName} ${usuario.lastName}`;
            listaUsuarios.appendChild(itemUsuario);
        });

        container.appendChild(listaUsuarios);
    });
}

buscarUsuarios();
