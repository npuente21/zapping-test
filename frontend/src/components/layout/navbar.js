import { Dropdown, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export default function Navbar(props) {
    const { authenticated, userData, logout } = props;
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{float: 'right'}}>
                    {authenticated && userData ? 
                        <Menu.SubMenu key="sub1" title={userData.email}>
                            <Menu.Item key="3" onClick={logout}>Cerrar Sesión</Menu.Item>
                        </Menu.SubMenu>
                            
                       
                        : 
                        <>
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
                        </>
                    }
                
                    
                    
                </Menu>
            </Header>
        </Layout>
    );
}