import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export default function Navbar(props) {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{float: 'right'}}>
                
                    <Menu.Item key="1" >
                        <Link to="/login" key={1}>
                        Iniciar Sesión
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2" >
                        <Link to="/sign-up" key={2}>
                        Registrate
                        </Link>
                    </Menu.Item>
                    
                </Menu>
            </Header>
        </Layout>
    );
}