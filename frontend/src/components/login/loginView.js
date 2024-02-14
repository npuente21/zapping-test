import React from 'react';
import { Alert, Button, Form, Input } from 'antd';


export default function LoginView(props) {
    const {userData, login, error, loading} = props;
    if (Object.keys(userData).length > 0){
        window.location.href = '/';
    }
    const onFinish = (values) => {
        const {email, password} = values;
        login(email, password);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >  
            <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Favor ingrese un email valido!',
                type: 'email',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Contraseña"
            name="password"
            rules={[
                {
                required: true,
                message: 'Porfavor ingrese una contraseña!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
            </Form.Item>

            {error && <Alert message={error} type="error" showIcon style={{marginBottom: '10px'}}/>}
        </Form>
    </div>
    );

};