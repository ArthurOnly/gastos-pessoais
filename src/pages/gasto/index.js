import {
  Layout,
  Form,
  InputNumber,
  Input,
  Spin,
  Button,
  Select,
  message,
  DatePicker,
  Typography,
} from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MainMenu from "../../components/menu";
import API from "../../helpers/api";
import { getUser } from "../../helpers/auth";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

function CreateSpent() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async (gasto) => {
    gasto.data = new Date(gasto.data).getTime()
    
    setLoading(true);
    const request = await API.post("/gasto", gasto);
    setLoading(false);  
    const response = request.data;

    if (response.ok) {
      message.success("Criado com sucesso");
      return;
    }

    message.error("Falha ao criar gasto. Verifique os dados");
  };
  return (
    <Layout className="mh-100-vh">
      <MainMenu />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="flex mx-auto my-auto"
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <Title level={2}>Cadastrar gasto</Title>
            <Form
              layout="vertical"
              size="large"
              name="basic"
              initialValues={{
                username: getUser() 
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="valor"
                label="Valor"
                rules={[{ required: true }]}
              >
                <Input prefix={"R$"} type="number" />
              </Form.Item>
              <Form.Item
                name="categoria"
                label="Categoria"
                rules={[{ required: true }]}
              >
                <Select
                  className="w-100"
                  style={{ width: 120 }}
                >
                  <Option value="Alimentação">Alimentação</Option>
                  <Option value="Transporte">Transporte</Option>
                  <Option value="Lazer">Lazer</Option>
                </Select>
              </Form.Item>

              <Form.Item name="data" label="Data" rules={[{ required: true }]}>
                <DatePicker className="w-100" />
              </Form.Item>

              <Form.Item className="d-none" name="username" label="Usuario" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item>
                <Spin spinning={loading}>
                  <Button block type="primary" htmlType="submit">
                    Criar gasto
                  </Button>
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>@2021</Footer>
      </Layout>
    </Layout>
  );
}

export default CreateSpent;
