import "./styles.css";

import { Layout, Menu } from "antd";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Layout breakpoint="lg" className="auth-layout">
        <div className="auth-form">
          <Title level={2} className="mb-8">
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
                  message: "Please input your username!",
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
                  message: "Please input your password!",
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

export default Login;
