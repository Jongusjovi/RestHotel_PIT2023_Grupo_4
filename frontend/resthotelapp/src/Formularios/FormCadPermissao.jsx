import { Container } from "react-bootstrap";
import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import { AuthContext } from '../contexts/authContext';
import { toast } from 'react-toastify';
import PageTitle from "../Componentes/PageTitle";
import { api, 
         buscarNiveisComPermissoes, 
         buscarNiveisSemPermissoes, 
         buscarMenus, buscarSubMenus, 
         buscarMenusPermitidos,
         buscarSubMenusPermitidos } from '../services/apiPermissoes';

export default function FormCadPermissao(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/permissoes';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [permissao, setPermissao] = useState(props.nivel)
    const [listaNiveis, setListaNiveis] = useState([]);

    const [listaMenus, setListaMenus] = useState(null)
    const [listaSubMenus, setListaSubMenus] = useState(null)

    const [checkedMenus, setCheckedMenus] = useState([])
    const [checkedSubMenus, setCheckedSubMenus] = useState([])

    const handleMenusCheckboxChange = (menu) => {
        setCheckedMenus((prevSubMenus) => {
            const updatedSubMenus = [...checkedMenus]

            const index = updatedSubMenus.findIndex(x => x.menu_id === menu)

            if (index !== -1) {
                updatedSubMenus.splice(index, 1)
            }
            else {
                updatedSubMenus.push(menu)
            }

            return updatedSubMenus
        })
    }

    const handleSubMenusCheckboxChange = (submenu) => {
        setCheckedSubMenus((prevSubMenus) => {
            const updatedSubMenus = [...checkedSubMenus]

            const index = updatedSubMenus.findIndex(x => x.submenu_id === submenu.submenu_id)

            if (index !== -1) {
                updatedSubMenus.splice(index, 1)
            }
            else {
                updatedSubMenus.push(submenu)
            }

            return updatedSubMenus
        })
    }


    const criarPermissoes = () => {
        const listaItens = []
    
        listaItens.push(
            <Row className="mb-4" style={{marginLeft: "1px"}}>
                <Form.Group className='mt-1 p-2 border rounded bg-light' as={Col} md="4">
                    <Form.Label style={{ fontWeight: 'bold'}}>Menus</Form.Label>
                    {
                        listaMenus.map((menu) => (
                            <Form.Check 
                                    type={'checkbox'}
                                    id={menu.id}
                                    label={menu.nome}
                                    value={menu}
                                    checked={checkedMenus.includes(menu.id)}
                                    onChange={() => handleMenusCheckboxChange(menu.id)}
                                />
                        ))
                    }
                </Form.Group>
                <Form.Group className='mt-1 p-2 border rounded bg-light' as={Col} md="8" style={{marginLeft: "25px", width: "60%"}}>
                    <Form.Label style={{ fontWeight: 'bold'}}>Sub-Menus</Form.Label>
                    {
                        listaSubMenus.map((submenu) => (
                            <Form.Check 
                                type={'checkbox'}
                                id={submenu.id}
                                label={submenu.nome}
                                value={submenu}
                                checked={checkedSubMenus.filter(x => x.submenu_id === submenu.id).length > 0}
                                onChange={() => handleSubMenusCheckboxChange(
                                    {
                                        submenu_id: submenu.id,
                                        menu_id: submenu.menu_id
                                    }
                                )}
                            />
                        ))
                    }
                </Form.Group>
            </Row>
        )

        return listaItens
    }

    function cadastrarPermissoes(permissoes) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(permissoes)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(permissoes)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function manipularMudanca(e) {
        const alvo = e.target.name;

        setPermissao({ ...permissao, [alvo]: e.target.value })
    }

    function validarDados() {
        const nivelId = props.modoEdicao ? permissao.id : permissao.nivel_id

        if (nivelId.length > 0) {
            const permissoes = {
                nivel_id: nivelId,
                permissoes: checkedMenus.map((menu) => (
                    {
                        menu_id: menu,
                        itens_menus: checkedSubMenus
                                        .filter( x => x.menu_id === menu)
                                        .map((submenu) => (
                                            submenu.submenu_id
                                        ))
                    }
                ))
            }

            setPermissao(permissoes)

            return permissoes;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const permissoes = validarDados();
            if (permissoes) {
                setStatus(STATUS.ocioso);
                cadastrarPermissoes(permissoes);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`

        const fetchData = async () => {
            try {
                const responseBuscarNiveis = (props.modoEdicao ? await buscarNiveisComPermissoes() : await buscarNiveisSemPermissoes())
                const responseBuscarMenus = await buscarMenus()
                const responseBuscarSubMenus = await buscarSubMenus()
                const responseBuscarMenusPermitidos = await buscarMenusPermitidos(permissao.id)
                const responseBuscarSubMenusPermitidos = await buscarSubMenusPermitidos(permissao.id)
                const chkMenus = []
                const chkSubMenus = []

                setListaNiveis(responseBuscarNiveis.data)
                setListaMenus(responseBuscarMenus.data)
                setListaSubMenus(responseBuscarSubMenus.data)

                responseBuscarMenusPermitidos.data.map((item) => (
                    chkMenus.push(item.menu_id)
                ))

                setCheckedMenus(chkMenus)

                responseBuscarSubMenusPermitidos.data.map((item) => (
                    chkSubMenus.push(
                        {
                            submenu_id: item.item_menu_id,
                            menu_id: item.menu_id
                        }
                        
                    )
                ))

                setCheckedSubMenus(chkSubMenus)
            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchData()
    }, []);

    if (status === STATUS.sucesso) {
        return (
            <Container style={{width: "45%"}}>
                <PageTitle texto={'Cadastro de Permissões por Nível'} />
                <Row className='mt-3 p-2 border rounded bg-light'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Nível:</Form.Label>
                                <Form.Select aria-label="Default select example" 
                                             id="nivel_id"
                                             name="nivel_id"
                                             disabled={props.modoEdicao}
                                             onChange={manipularMudanca}
                                             value={props.modoEdicao ? permissao.id : null}>
                                    <option value='0'>Selecione um nível de Usuário</option>
                                    {
                                        listaNiveis.map(opcao => {
                                            return <option 
                                                        key={opcao.id} 
                                                        value={opcao.id}>
                                                        {opcao.nome}
                                                    </option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        {listaMenus !== null && listaSubMenus !== null && criarPermissoes()}

                        <Button type="submit" className="mb-2">Salvar</Button> { }
                        <Button variant="secondary" className="mb-2" type="button" onClick={() => { props.onTabela(true) }}>Voltar</Button>
                   </Form>
                </Row>
            </Container>
        );
    }
    else if (status === STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível gravar o nível de usuário.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}