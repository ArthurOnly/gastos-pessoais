import { Layout, Progress, Card, Typography, Table, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainMenu from "../../components/menu";
import API from "../../helpers/api";
import { getUser } from "../../helpers/auth";

const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
  },
  {
    title: "Categoria",
    dataIndex: "categoria",
    key: "categoria",
  },
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
  },
  {
    title: "Ações",
    dataIndex: "action",
    key: "action",
  },
];

function Extrato() {
    const [allSpents, setSpents] = useState([]);

    useEffect(async () => {
        const username = getUser();
        const request = await API.get(`/gasto`, {
        params: {
            username: username,
        },
        });
        const response = request.data;
        const spents = response.gastos;
        spents.map((spent) => {
            let data = new Date(spent.data);
            let mes =
                data.getMonth() + 1 < 10
                ? "0" + (data.getMonth() + 1)
                : data.getMonth();
            let dataFormatada = data.getDate() + "/" + mes + "/" + data.getFullYear();
            spent.data = dataFormatada;
            spent.action = (
                <Button danger type="link" onClick={() => deleteSpent(spent._id, spent._rev)}>
                <DeleteOutlined /> Deletar
                </Button>
            );
        });

        setSpents(response.gastos);
    }, []);

    async function deleteSpent(id, rev){
        const data = {id: id, rev: rev}
        const request = await API.delete('/gasto', {data})
        const response = request.data

        if (response.erro){
            message.error("Ocorreu um erro ao deletar.")
            return;
        }

        message.success("Deletado com sucesso.")
        setSpents(allSpents.filter(spent => {if (spent._id != id) return spent}))
    }

  return (
    <Layout className="mh-100-vh">
      <MainMenu />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <Table dataSource={allSpents} columns={columns} />;
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Extrato;
