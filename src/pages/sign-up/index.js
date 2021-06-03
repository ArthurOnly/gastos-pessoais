import API from '../../helpers/api'
import {login} from '../../helpers/auth'
import "./styles.css";

import { Layout } from "antd"
import { Form, Input, Button, Typography } from "antd"
import { DollarOutlined } from "@ant-design/icons"
import { Redirect, Link } from 'react-router';

const { Title } = Typography

function SignUp() {
  const onFinish = (user) => {
    API.post('/usuario', user)
    .then(()=> login(user))
    .then(()=><Redirect to='/'></Redirect>)
    .catch(()=> alert('Um erro ocorreu'))
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

            <Form.Item
              label="Meta"
              name="meta"
              rules={[
                {
                  required: true,
                  message: "Coloque uma meta válida",
                },
              ]}
            >
              <Input prefix={"$"} type="number"/>
            </Form.Item>


            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Cadastre-se
              </Button>
            </Form.Item>
            <div className="d-flex flex-row align-center">
              <Typography>Já tem uma conta?</Typography>
              <Button type="link">Login</Button>
            </div>
          </Form>
        </div>
      </Layout>
    </Layout>
  );
}

export default SignUp;
