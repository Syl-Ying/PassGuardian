import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

const PasswordGenerator = () => {
    const [alphabet, setAlphabet] = useState(false);
    const [numerals, setNumerals] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    const generatePassword = () => {
        if ((!alphabet && !numerals && !symbols) || !length || isNaN(length) || length < 4 || length > 50) {
            toast.error('Please select at least one option for characters and provide a valid length between 4 and 50.');
            return;
        }

        const characters = [];
        if (alphabet) characters.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (numerals) characters.push('0123456789');
        if (symbols) characters.push('!@#$%^&*()-_=+[{]}|;:,');
        // Ensure each character type is represented at least once
        let password = '';
        characters.forEach(charSet => {
            password += charSet.charAt(Math.floor(Math.random() * charSet.length));
        });

        // Generate remaining characters randomly
        const remainingLength = length - password.length;
        for (let i = 0; i < remainingLength; i++) {
            const randomCharSet = characters[Math.floor(Math.random() * characters.length)];
            password += randomCharSet.charAt(Math.floor(Math.random() * randomCharSet.length));
        }

        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        setGeneratedPassword(password);
    };

    return (
        <div className="flex flex-col gap-4">
            <ToastContainer />
            <label className="flex items-center space-x-2">
                <input type="checkbox" checked={alphabet} onChange={() => setAlphabet(!alphabet)} />
                Alphabet (A-Z, a-z)
            </label>
            <label className="flex items-center space-x-2">
                <input type="checkbox" checked={numerals} onChange={() => setNumerals(!numerals)} />
                Numerals (0-9)
            </label>
            <label>
                <input  type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols) } />
                Symbols (!@#$%^&*()-_=+{}|;:,)
            </label>
            <label>
                Length:
                <input className="px-2 py-1 border border-gray-300 rounded-md" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
            </label>
            <button onClick={generatePassword} className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-blue-600">Generate Password</button>
            {generatedPassword && (
                <div>
                    <h3>Generated Password:</h3>
                    <p>{generatedPassword}</p>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
