import { Credentials } from '@watson/models';
import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Layout, message } from 'antd';
import { useState } from 'react';
import { authClient } from '../../clients';
import { authenticator } from '../../lib';
import { AxiosError } from 'axios';

const { Content } = Layout;

interface LoginPageProps {
  onLoggedIn: () => void;
}

export function LoginPage(props: LoginPageProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin: FormProps<Credentials>['onFinish'] = async (
    credentials
  ) => {
    try {
      setLoading(true);

      const auth = await authClient.login(credentials);
      authenticator.signIn(auth);

      props.onLoggedIn();
    } catch (error) {
      console.error('Failed to login: ', error);

      let text = 'No se pudo iniciar sesión. Por favor, inténtalo de nuevo.';
      if ((error as AxiosError).response?.status === 400) {
        text =
          'No se pudo iniciar sesión. Por favor, verifica tu usuario y contraseña e inténtalo de nuevo.';
      }
      message.error(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content>
        <Flex justify="center" align="center" style={{ height: '100vh' }}>
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              autoComplete="off"
            >
              <Form.Item<Credentials>
                label="Usuario"
                name="username"
                rules={[
                  { required: true, message: 'Por favor, escriba el usuario' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<Credentials>
                label="Contraseña"
                name="password"
                rules={[
                  { required: true, message: 'Por favor, escriba el password' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
}

export default LoginPage;
