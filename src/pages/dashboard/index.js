import { Layout, Progress, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import MainMenu from '../../components/menu'

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  return (
    <Layout className="mh-100-vh">
      <MainMenu/>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div class="d-flex w-100 h-100 flex-wrap align-center justify-center lg-flex-row">
            <div class="w-100 mb-4 lg-w-auto flex-grow-1 text-center">
            <Typography.Title level={2}>Meta</Typography.Title>
              <Progress type="circle" percent={75} />
            </div>
            <div class="flex-grow-1">
                <Card className="mb-4" title="Meta" style={{ width: 300 }}>
                    <p>R$ 1000</p>
                </Card>
                <Card className="mb-4" title="Gastos atuais" style={{ width: 300 }}>
                    <p>R$ 1000</p>
                </Card>
                <Link>
                    <Typography.Link type="link">Ver extrato</Typography.Link>
                </Link>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
