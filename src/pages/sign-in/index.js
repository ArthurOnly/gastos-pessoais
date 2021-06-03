import "./styles.css";

import { Layout, Menu } from "antd"
import { Form, Input, Button, Typography } from "antd"
import { DollarOutlined } from "@ant-design/icons"
import API from "../../helpers/api";
import { login } from "../../helpers/auth";
import { Redirect } from "react-router";

const { Title } = Typography

function SignIn() {
  const onFinish = async (user) => {
    const response = await API.post('login', user)
    if (response.valido){
      login(user.username)
      return <Redirect to='/'/>
    }
    alert('Dados incorretos')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Layout breakpoint="lg" className="auth-layout">
        <div className="auth-form">
          <Title level={2} className="mb-8">
            <DollarOutlined className="mr-2"/>
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
            onFinishFailed={onFinishFailed}
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
              name="password"
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
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <div className="d-flex flex-row align-center">
              <Typography>Não tem uma conta?</Typography>
              <Button type="link">Cadastre-se</Button>
            </div>
          </Form>
        </div>
      </Layout>
    </Layout>
  );
}

export default SignIn;
