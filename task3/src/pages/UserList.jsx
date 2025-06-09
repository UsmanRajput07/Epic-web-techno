import { useState, useCallback, memo } from "react";
import { debounce } from "../helper/debounce";

export const UserList = memo(function UserList({ users, onUserSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredUsers = useCallback(
        () =>
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [users, searchTerm]
    );

    const searchUsers = debounce(setSearchTerm, 1000);
    return (
        <div>
            <input
                value={searchTerm}
                onChange={(e) => searchUsers(e.target.value)}
                placeholder="Search users..."
            />
            {filteredUsers().map((user) => (
                <UserCard key={user.id} user={user} onClick={() => onUserSelect(user)} />
            ))}
        </div>
    );
});

