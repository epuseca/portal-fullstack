import React, { useContext } from 'react';
import { Button, Col, Divider, Row, Form, Input, notification } from 'antd';
import { createUserApi, loginApi } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password)
        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token)
            notification.success({
                message: "LOGIN USER",
                description: "Success"
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? ""
                }
            });
            navigate("/")
        } else {
            notification.error({
                message: "LOGIN USER",
                description: res?.EM ?? "Error"
            })
        }

        console.log('>>>> Success:', res);
    };
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
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
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    {/* <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                    </div> */}
                </fieldset>
            </Col>
        </Row>
    )
}
export default LoginPage;