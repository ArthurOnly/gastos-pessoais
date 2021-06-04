import { Menu, Layout, Typography } from "antd"
import {
  FileSearchOutlined,
    LogoutOutlined,
    DollarOutlined
  } from "@ant-design/icons";
import { Link } from "react-router-dom";
  
const { Sider } = Layout
const { Title } = Typography

function MainMenu(){
    return (
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Link to='/'>
          <Title style={{color: "#fff"}} level={4} className="mb-8 py-2 px-2">
            <DollarOutlined className="mr-2" />
            Gastos pessoais
          </Title>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<FileSearchOutlined />}>
            Extrato
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            Sair
          </Menu.Item>
        </Menu>
      </Sider>
    )
}

export default MainMenu