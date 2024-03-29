import { Layout, Table, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MainMenu from "../../components/menu";
import API from "../../helpers/api";
import { getUser } from "../../helpers/auth";

const { Content, Footer } = Layout;

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

  useEffect(() => {
    async function f() {
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
        let dataFormatada =
          data.getDate() + "/" + mes + "/" + data.getFullYear();
        spent.data = dataFormatada;
        spent.valor = "R$ "+spent.valor;
        spent.action = (
          <Button
            danger
            type="link"
            onClick={() => deleteSpent(spent._id, spent._rev)}
          >
            <DeleteOutlined /> Deletar
          </Button>
        );
        return spent
      });
      if (active) setSpents(response.gastos);
    }

    let active = true
    f();
    return () => active = false
  }, [allSpents]);

  async function deleteSpent(id, rev) {
    let confirm = window.confirm("Tem certeza que deseja deletar?");
    if (!confirm) return;

    const data = { id: id, rev: rev };
    const request = await API.delete("/gasto", { data });
    const response = request.data;

    if (response.erro) {
      message.error("Ocorreu um erro ao deletar.");
      return;
    }

    message.success("Deletado com sucesso.");
  }

  return (
    <Layout className="mh-100-vh">
      <MainMenu />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <Table dataSource={allSpents} columns={columns} rowKey={record => record._id } />
        </Content>
        <Footer style={{ textAlign: "center" }}>©2021</Footer>
      </Layout>
    </Layout>
  );
}

export default Extrato;
