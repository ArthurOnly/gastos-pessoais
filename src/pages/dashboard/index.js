import { Layout, Progress, Card, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainMenu from '../../components/menu'
import API from "../../helpers/api";
import { getUser } from "../../helpers/auth";

const { Content, Footer } = Layout;

function Dashboard() {
  const [meta, setMeta] = useState()
  const [gastos, setGastos] = useState(0)

  useEffect(async()=> {
    setGastos(0)

    const username = getUser();
    const request = await API.get("/gasto", {params: {username}})
    const response = request.data;
    const spents = response.gastos;
    
    let spentsValue = 0
    spents.map(spent => {
      spentsValue += Number(spent.valor)
    })
    setGastos(spentsValue)

    const requestMeta = await API.get('/meta', {params: {username}})
    const responseMeta = requestMeta.data
    setMeta(Number(responseMeta.meta))

  }, [])

  return (
    <Layout className="mh-100-vh">
      <MainMenu/>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="d-flex w-100 h-100 flex-wrap align-center justify-center lg-flex-row">
            <div className="w-100 mb-4 lg-w-auto flex-grow-1 text-center">
            <Typography.Title level={2}>Meta</Typography.Title>
              <Progress status={gastos/meta > 1 ? 'exception' : 'success'} type="circle" percent={100*(gastos/meta)} />
            </div>
            <div className="flex-grow-1">
                <Card className="mb-4" title="Meta" style={{ width: 300 }}>
                    <p>R$ {meta}</p>
                </Card>
                <Card className="mb-4" title="Gastos atuais" style={{ width: 300 }}>
                    <p>R$ {gastos}</p>
                </Card>
                <Link to="/extrato">
                    <Typography.Link type="link">Ver extrato</Typography.Link>
                </Link>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2021
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
