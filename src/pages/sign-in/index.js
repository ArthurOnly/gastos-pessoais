import "./styles.css";

import { Link } from "react-router-dom";
import { Layout, Spin } from "antd";
import { Form, Input, Button, Typography, message } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import API from "../../helpers/api";
import { login, isAuthenticated } from "../../helpers/auth";
import { Redirect, useHistory } from "react-router";
import { useState } from "react";

const { Title } = Typography;

function SignIn() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) return <Redirect to="/" />;

  const onFinish = async (user) => {
    setLoading(true);
    const request = await API.post("/login", user);
    setLoading(false);
    const response = request.data;

    if (response.valido) {
      login(user.username);
      message.success("Logado com sucesso");
      history.push("/")
      return;
    }

    message.error("Falha no login. Verifique os dados");
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
                  message: "Coloque um nome de usuário válido",
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
                  message: "Coloque uma senha válida",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Spin spinning={loading}>
                <Button block type="primary" htmlType="submit">
                  Login
                </Button>
              </Spin>
            </Form.Item>
            <div className="d-flex flex-row align-center">
              <Typography>Não tem uma conta?</Typography>
              <Link to="/sign-up">
                <Button type="link">Cadastre-se</Button>
              </Link>
            </div>
          </Form>
        </div>
      </Layout>
    </Layout>
  );
}

export default SignIn;
