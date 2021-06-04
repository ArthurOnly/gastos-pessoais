import { useState } from "react";
import API from "../../helpers/api";
import { login, isAuthenticated } from "../../helpers/auth";
import "./styles.css";

import { Layout } from "antd";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Redirect, Link, useHistory } from "react-router-dom";

const { Title } = Typography;

function SignUp() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) return <Redirect to="/" />;

  const onFinish = async (user) => {
    setLoading(true);
    const request = await API.post("/usuario", user);
    setLoading(false);

    const response = request.data;

    if (response.erro) {
      message.error("Falha na criação do usuário");
      return;
    }

    login(user.username);
    message.success("Usuário criado com sucesso");
    history.push("/");
  };

  return (
    <Layout>
      <Layout breakpoint="lg" className="auth-layout">
        <div className="auth-form">
          <Title level={2} className="mb-8">
            <DollarOutlined className="mr-2" />
            Gastos pessoais
          </Title>
          <Form
            layout="vertical"
            size="large"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Insira um nome de usuário válido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="senha"
              rules={[
                {
                  required: true,
                  message: "Insira uma senha válida",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Meta"
              name="meta"
              rules={[
                {
                  required: true,
                  message: "Insira uma meta válida",
                },
              ]}
            >
              <Input prefix={"$"} type="number" />
            </Form.Item>

            <Form.Item>
              <Spin spinning={loading}>
                <Button block type="primary" htmlType="submit">
                  Cadastre-se
                </Button>
              </Spin>
            </Form.Item>
            <div className="d-flex flex-row align-center">
              <Typography>Já tem uma conta?</Typography>
              <Link to="sign-in">
                <Button type="link">Login</Button>
              </Link>
            </div>
          </Form>
        </div>
      </Layout>
    </Layout>
  );
}

export default SignUp;
