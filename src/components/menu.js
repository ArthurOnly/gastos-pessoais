import { Menu, Layout, Typography } from "antd";
import {
  FileSearchOutlined,
  LogoutOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../helpers/auth";

const { Sider } = Layout;
const { Title } = Typography;

function MainMenu() {
  const history = useHistory();

  function handleLoggout() {
    logout();
    history.push("/");
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Link to="/">
        <Title style={{ color: "#fff" }} level={5} className="mb-8 py-2 px-5">
          <DollarOutlined className="mr-2" />
          Gastos pessoais
        </Title>
      </Link>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="1" icon={<FileSearchOutlined />}>
          <Link to="/gasto/create">Adicionar gasto</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileSearchOutlined />}>
          <Link to="/extrato">Extrato</Link>
        </Menu.Item>
        <Menu.Item
          onClick={() => handleLoggout()}
          key="3"
          icon={<LogoutOutlined />}
        >
          Sair
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default MainMenu;
