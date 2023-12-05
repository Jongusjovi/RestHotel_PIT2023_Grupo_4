import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext, AuthProvider } from './contexts/authContext'
import TelaMenu from './Telas/TelaMenu'
import TelaLogin from './Telas/TelaLogin'
import STATUS from './utilitarios/util'
import TelaCarregamento from './Telas/TelaCarregamento'
import TelaCadastroDeCliente from './Telas/TelaDeCadastroDeCliente'
import TelaCadastroDeFuncionario from './Telas/TelaDeCadastroDeFuncionario'
import TelaCadastroDeTipoQuarto from './Telas/TelaDeCadastroDeTipoQuarto'
import TelaCadastroDeProduto from './Telas/TelaDeCadastroDeProduto'
import TelaCadastroQuarto from './Telas/TelaDeCadastroDeQuarto'
import TelaCadastroDeHospedagem from './Telas/TelaDeCadastroDeHospedagem'
import TelaDeCadastroDeReservaDeHospedagem from './Telas/TelaDeCadastroDeReservaDeHospedagem'
import Funcoes from './Telas/Funcoes'
import Sobre from './Telas/Sobre'
import Contato from './Telas/Contato'
import TelaCadastroDeFornecedor from './Telas/TelaDeCadastroDeFornecedor'
import TelaCadastroDeServico from './Telas/TelaDeCadastroDeServico'
import TelaCadastroDeConsumoDeFuncionario from './Telas/TelaDeCadastroDeConsumoDeFuncionario'
import Servicos from './Telas/Servicos'
import Projetos from './Telas/Projetos'
import Ofertas from './Telas/Ofertas'
import TelaCadastroDeUsuario from './Telas/TelaDeCadastroDeUsuario'
import TelaDeCadastroDeNivel from './Telas/TelaDeCadastroDeNivel'
import TelaCadastroDePermissao from './Telas/TelaDeCadastroDePermissao'
import TelaCadastroDeCategoriaDespesa from './Telas/TelaDeCadastroDeCategoriaDespesa'
import TelaCadastroDeDespesa from './Telas/TelaDeCadastroDeDespesa'
import TelaRelatorioDeHospedagens from './Telas/TelaDeRelatorioDeHospedagens'
import TelaRelatorioDeReservas from './Telas/TelaDeRelatorioDeReservas'
import TelaRelatorioDeConsumos from './Telas/TelaDeRelatorioDeConsumos'
import TelaRelatorioDeProdutos from './Telas/TelaDeRelatorioDeProdutos'
import TelaRelatorioDeDespesas from './Telas/TelaDeRelatorioDeDespesas'
import { ToastContainer, toast } from 'react-toastify'

const AppRoutes = () => {
    const SubMenus = {
        TelaCadastroDeCliente: 'cadastroClientes',
        TelaCadastroDeFornecedor: 'cadastroFornecedores',
        Funcoes: 'cadastroFuncoes',
        TelaCadastroDeFuncionario: 'cadastroFuncionarios',
        TelaCadastroDeConsumoDeFuncionario: 'cadastroConsumosFuncionarios',
        TelaCadastroDeTipoQuarto: 'cadastroTiposQuarto',
        TelaCadastroQuarto: 'cadastroQuartos',
        TelaCadastroDeProduto: 'cadastroProdutos',
        TelaCadastroDeServico: 'cadastroServicos',
        TelaDeCadastroDeReservaDeHospedagem: 'cadastroReservaHospedagens',
        TelaCadastroDeHospedagem: 'cadastroHospedagens',
        TelaCadastroDeUsuario: 'cadastroUsuarios',
        TelaDeCadastroDeNivel: 'cadastroNiveis',
        TelaCadastroDePermissao: 'cadastroPermissoes',
        TelaCadastroDeCategoriaDespesa: 'cadastroCategoriasDespesas',
        TelaCadastroDeDespesa: 'cadastroDespesas',
        TelaRelatorioDeHospedagens: 'relatorioHospedagens',
        TelaRelatorioDeReservas: 'relatorioReservas',
        TelaRelatorioDeConsumos: 'relatorioConsumosClientes',
        TelaRelatorioDeProdutos: 'relatorioProdutos',
        TelaRelatorioDeDespesas: 'relatorioContasPagar',
    }

    const Private = ({children}) => {
        const { authenticated, status } = useContext(AuthContext)
        const listaSubMenus = JSON.parse(localStorage.getItem('listaSubMenus'))
        const itemMenu = SubMenus[children.type.name]

        const itemEncontrado = listaSubMenus !== null ? listaSubMenus.filter(x => x.permissao_item_menu != null).find(obj => obj.permissao_item_menu.caminho === itemMenu) : null

        if (status === STATUS.loading) {
            return (
                <TelaCarregamento />
            )
        }

        if (!authenticated) {
            return <Navigate to='/login' />
        }

        if (itemMenu != undefined && !itemEncontrado) {
            toast.error('Nível de usuário sem permissão!')
            return <ToastContainer />
        }

        return children
    }

    const HandleLogout = () => {
        const { logout } = useContext(AuthContext)

        logout()
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path='/login' element={<TelaLogin />}/>
                    <Route exact path='/' element={<Private><TelaMenu /></Private>}/>
                    <Route exact path='/cadastroClientes' element={<Private><TelaCadastroDeCliente /></Private>} />
                    <Route exact path='/cadastroFornecedores' element={<Private><TelaCadastroDeFornecedor /></Private>} />
                    <Route exact path='/cadastroFuncoes' element={<Private><Funcoes /></Private>} />
                    <Route exact path='/cadastroFuncionarios' element={<Private><TelaCadastroDeFuncionario /></Private>} />
                    <Route exact path='/cadastroConsumosFuncionarios' element={<Private><TelaCadastroDeConsumoDeFuncionario /></Private>} />
                    <Route exact path='/cadastroTiposQuarto' element={<Private><TelaCadastroDeTipoQuarto /></Private>} />
                    <Route exact path='/cadastroQuartos' element={<Private><TelaCadastroQuarto /></Private>} />
                    <Route exact path='/cadastroProdutos' element={<Private><TelaCadastroDeProduto /></Private>} />
                    <Route exact path='/cadastroServicos' element={<Private><TelaCadastroDeServico /></Private>} />
                    <Route exact path='/cadastroReservaHospedagens' element={<Private><TelaDeCadastroDeReservaDeHospedagem /></Private>} />
                    <Route exact path='/cadastroHospedagens' element={<Private><TelaCadastroDeHospedagem /></Private>} />
                    <Route exact path='/cadastroUsuarios' element={<Private><TelaCadastroDeUsuario /></Private>} />
                    <Route exact path='/cadastroNiveis' element={<Private><TelaDeCadastroDeNivel /></Private>} />
                    <Route exact path='/cadastroPermissoes' element={<Private><TelaCadastroDePermissao /></Private>} />
                    <Route exact path='/cadastroCategoriasDespesas' element={<Private><TelaCadastroDeCategoriaDespesa /></Private>} />
                    <Route exact path='/cadastroDespesas' element={<Private><TelaCadastroDeDespesa /></Private>} />
                    <Route exact path='/relatorioHospedagens' element={<Private><TelaRelatorioDeHospedagens /></Private>} />
                    <Route exact path='/relatorioReservas' element={<Private><TelaRelatorioDeReservas /></Private>} />
                    <Route exact path='/relatorioConsumosClientes' element={<Private><TelaRelatorioDeConsumos /></Private>} />
                    <Route exact path='/relatorioProdutos' element={<Private><TelaRelatorioDeProdutos /></Private>} />
                    <Route exact path='/relatorioContasPagar' element={<Private><TelaRelatorioDeDespesas /></Private>} />
                    <Route exact path='/sobre' element={<Private><Sobre /></Private>} />
                    <Route exact path='/ofertas' element={<Private><Ofertas /></Private>} />
                    <Route exact path='/servicos' element={<Private><Servicos /></Private>} />
                    <Route exact path='/projetos' element={<Private><Projetos /></Private>} />
                    <Route exact path='/contato' element={<Private><Contato /></Private>} />
                    <Route exact path='/logout' element={<HandleLogout />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes