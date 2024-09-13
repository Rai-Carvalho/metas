const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Tomar água",
    checked: false
} 

let metas = [ meta ]

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite a meta:"})
    
    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push({
        value: meta, 
        checked: false
    })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar e o ENTER para finalizar",
        choices: [...metas],
        instructions: false,
    })
    
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma resposta selecionada")
        return
    }


    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluída(s)")
}  

const metasRealizadas = async () => {
    const realizadas =  metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0) {
        console.log('Não existem metas realizadas!')
        return
    }

    await select({
        message: "Metas Realizadas " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0) {
        console.log('Não existem metas abertas')
        return
    }

    await select({
        message: 'Metas abertas ' + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    
    const itensDeletar = await checkbox({
        message: "Selecione uma meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensDeletar.length == 0) {
        console.log('Nenhum item para deletar!')
        return
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s)")
}

const start = async () => {
    
    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMetas()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }

    }
}

start()