import React from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';


export default function SignUpView(props) {
    const {createdUser, error, loading, createUser} = props;
    const onFinish = (values) => {
        console.log('Success:', values);
        createUser(values.first_name, values.last_name, values.email, values.password);
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
            label="Nombre"
            name="first_name"
            rules={[
                {
                required: true,
                message: 'Favor ingrese su nombre!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Apellido"
            name="last_name"
            rules={[
                {
                required: true,
                message: 'Favor ingrese su apellido!',
                },
            ]}
            >
            <Input />
            </Form.Item>

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
            dependencies={['password']}
            label="Confirme contraseña"
            name="confirm_password"
            rules={[
                {
                required: true,
                message: 'Porfavor ingrese una contraseña!',
                },
                ({ getFieldValue }) => ({
                    message: 'Las contraseñas no coinciden!',
                    validator: (_, value) =>
                    !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(),
                }),
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Checkbox>Remember me</Checkbox>
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
            {createdUser && <Alert message="Usuario creado exitosamente" type="success" showIcon style={{marginBottom: '10px'}}/>}
        </Form>
    </div>
    );

};