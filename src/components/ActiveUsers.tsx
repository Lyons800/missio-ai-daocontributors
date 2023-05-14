import { useEffect, useState } from 'react';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import ActiveUsersCardList from './ActiveUsersCardList';
import fs from 'fs';
import path from 'path';

export default function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersPath = path.join(process.cwd(), 'users.json');
        fs.readFile(usersPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            setUsers(JSON.parse(data));
        });
    }, []);

    return (
        <ChakraProvider>
            <CSSReset />
            <Box p="4">
                {users.length > 0 ? <ActiveUsersCardList users={users} /> : 'Loading...'}
            </Box>
        </ChakraProvider>
    );
}

