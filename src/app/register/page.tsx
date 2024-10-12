'use client';

import React from 'react';
import RegisterForm from '@/components/RegisterForm';

const Register = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-50">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <RegisterForm />
        </div>
    );
};

export default Register;
